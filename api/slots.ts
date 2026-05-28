/**
 * GET /api/slots
 * Returns the next available 30-min slots from Google Calendar (Freebusy API).
 *
 * Env vars required (set in Vercel dashboard + .env.local for local dev):
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
 *   GOOGLE_CALENDAR_ID
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";

// ─── ✏️  Edit these constants to change your availability ────────────────────
// WORKING_DAYS: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
const WORKING_DAYS  = [0, 1, 2, 3, 4, 5, 6]; // every day of the week

// Two daily windows (IST hours, 24-h).
// start = first slot begins at this hour; end = no slot may START at or after this hour.
// e.g. { start: 6, end: 11 } → slots at 6:00, 6:30 … 10:30 (last ends at 11:00)
const TIME_WINDOWS  = [
  { start:  6, end: 11 },   //  6:00 AM – 11:00 AM IST (morning)
  { start: 18, end: 23 },   //  6:00 PM – 11:00 PM IST (evening)
];

const SLOT_MINUTES  = 30;
const BUFFER_MINS   = 15;             // buffer (mins) padded around existing calendar events
const DAYS_AHEAD    = 14;             // how many days ahead to expose slots
const TIMEZONE      = "Asia/Kolkata";
const IST_OFFSET_MS = 5.5 * 60 * 60_000; // UTC+5:30 in milliseconds

interface BusyBlock { start: string; end: string; }

interface Slot {
  id: string;
  label: string;
  time: string;
  iso: string;
  endIso: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    });

    const { token } = await oauth2Client.getAccessToken();

    const now   = new Date();
    const until = new Date(now.getTime() + DAYS_AHEAD * 86_400_000);

    const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin:  now.toISOString(),
        timeMax:  until.toISOString(),
        timeZone: TIMEZONE,
        items:    [{ id: process.env.GOOGLE_CALENDAR_ID }],
      }),
    });

    if (!fbRes.ok) {
      const err = await fbRes.text();
      console.error("Freebusy error:", err);
      return res.status(500).json({ error: "Failed to fetch calendar availability" });
    }

    const fb   = await fbRes.json();
    const busy: BusyBlock[] = fb.calendars?.[process.env.GOOGLE_CALENDAR_ID!]?.busy ?? [];
    const slots = deriveSlots(busy, now, until);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate"); // cache 5 min
    return res.status(200).json({ slots });

  } catch (err) {
    console.error("Slots handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ─── IST-aware time helpers ───────────────────────────────────────────────────
// Vercel servers run in UTC. All day/hour checks must be done in IST (UTC+5:30).

/** Returns the day-of-week (0=Sun…6=Sat) for a Date in IST. */
function istDay(d: Date): number {
  return new Date(d.getTime() + IST_OFFSET_MS).getUTCDay();
}

/** Returns the hour (0–23) for a Date in IST. */
function istHour(d: Date): number {
  return new Date(d.getTime() + IST_OFFSET_MS).getUTCHours();
}

/**
 * Advances cursor to START_HOUR IST on a future IST day.
 * daysToAdd = 1 → tomorrow's working-day start.
 */
function jumpToNextISTDay(cursor: Date, daysToAdd: number): void {
  const ist = new Date(cursor.getTime() + IST_OFFSET_MS);
  ist.setUTCDate(ist.getUTCDate() + daysToAdd);
  ist.setUTCHours(TIME_WINDOWS[0].start, 0, 0, 0); // land on the first window's start
  cursor.setTime(ist.getTime() - IST_OFFSET_MS);
}

/**
 * Moves cursor to the given IST hour (minute 0) on the same IST calendar day.
 * Safe to call only when hour > current IST hour (no backward movement).
 */
function setISTHour(cursor: Date, hour: number): void {
  const ist = new Date(cursor.getTime() + IST_OFFSET_MS);
  ist.setUTCHours(hour, 0, 0, 0);
  cursor.setTime(ist.getTime() - IST_OFFSET_MS);
}

// ─── Derive available slots from busy blocks ──────────────────────────────────

function deriveSlots(busy: BusyBlock[], from: Date, until: Date): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);

  while (cursor < until) { // no count cap — DAYS_AHEAD is the only limit
    const dow     = istDay(cursor);
    const curHour = istHour(cursor);

    // Skip non-working days
    if (!WORKING_DAYS.includes(dow)) {
      jumpToNextISTDay(cursor, 1);
      continue;
    }

    // Find the active window (if any) for the current IST hour
    const activeWindow = TIME_WINDOWS.find(w => curHour >= w.start && curHour < w.end) ?? null;

    if (!activeWindow) {
      // Not inside any window — jump to the next window today, or to tomorrow's first window
      const nextWindow = TIME_WINDOWS.find(w => w.start > curHour);
      if (nextWindow) {
        setISTHour(cursor, nextWindow.start);
      } else {
        jumpToNextISTDay(cursor, 1); // past all windows today
      }
      continue;
    }

    // Inside a window — check for conflicts and emit the slot
    const slotEnd = new Date(cursor.getTime() + SLOT_MINUTES * 60_000);
    const blocked = busy.some(b => {
      const bs = new Date(b.start).getTime() - BUFFER_MINS * 60_000;
      const be = new Date(b.end).getTime()   + BUFFER_MINS * 60_000;
      return cursor.getTime() < be && slotEnd.getTime() > bs;
    });

    if (!blocked) {
      slots.push({
        id:     cursor.toISOString(),
        label:  cursor.toLocaleDateString("en-GB", {
          weekday: "short", day: "numeric", month: "short", timeZone: TIMEZONE,
        }),
        time:   cursor.toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit", timeZone: TIMEZONE,
        }),
        iso:    cursor.toISOString(),
        endIso: slotEnd.toISOString(),
      });
    }

    cursor.setMinutes(cursor.getMinutes() + SLOT_MINUTES);
  }
  return slots;
}
