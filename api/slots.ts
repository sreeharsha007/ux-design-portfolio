/**
 * GET /api/slots
 * Returns the next available 30-min slots from Google Calendar (Freebusy API).
 *
 * Env vars required (set in Vercel dashboard + .env.local for local dev):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_CALENDAR_ID
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleAuth } from "google-auth-library";

// ─── Config ───────────────────────────────────────────────────────────────────
const WORKING_DAYS  = [1, 2, 3, 4, 5]; // Mon–Fri
const START_HOUR    = 9;                // 9:00 AM IST
const END_HOUR      = 18;              // 6:00 PM IST
const SLOT_MINUTES  = 30;
const BUFFER_MINS   = 15;              // gap around existing events
const DAYS_AHEAD = 14; // return all slots across next 14 days (~250 slots)
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
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const client      = await auth.getClient();
    const tokenResult = await (client as any).getAccessToken();
    const token       = tokenResult.token as string;

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
  ist.setUTCHours(START_HOUR, 0, 0, 0);
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
    const dow  = istDay(cursor);
    const hour = istHour(cursor);

    // Skip weekends — jump straight to Monday (or next working day) at START_HOUR IST
    if (!WORKING_DAYS.includes(dow)) {
      jumpToNextISTDay(cursor, 1);
      continue;
    }

    // Before working hours — fast-forward to START_HOUR IST (same IST day)
    if (hour < START_HOUR) {
      setISTHour(cursor, START_HOUR);
    }

    // After working hours — jump to START_HOUR IST on the next IST day
    if (istHour(cursor) >= END_HOUR) {
      jumpToNextISTDay(cursor, 1);
      continue;
    }

    const slotEnd = new Date(cursor.getTime() + SLOT_MINUTES * 60_000);
    const blocked = busy.some(b => {
      const bs = new Date(b.start).getTime() - BUFFER_MINS * 60_000;
      const be = new Date(b.end).getTime()   + BUFFER_MINS * 60_000;
      return cursor.getTime() < be && slotEnd.getTime() > bs;
    });

    if (!blocked) {
      slots.push({
        id:     cursor.toISOString(),
        // Format label/time in IST so they display correctly for Indian visitors
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
