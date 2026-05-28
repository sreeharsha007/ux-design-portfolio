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
const START_HOUR    = 9;                // 9:00 AM
const END_HOUR      = 18;              // 6:00 PM
const SLOT_MINUTES  = 30;
const BUFFER_MINS   = 15;              // gap around existing events
const SLOTS_TO_SHOW = 5;
const DAYS_AHEAD    = 14;
const TIMEZONE      = "Asia/Kolkata";

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
    const slots = deriveSlots(busy, now, until).slice(0, SLOTS_TO_SHOW);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate"); // cache 5 min
    return res.status(200).json({ slots });

  } catch (err) {
    console.error("Slots handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Derive available slots from busy blocks ──────────────────────────────────

function deriveSlots(busy: BusyBlock[], from: Date, until: Date): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);

  while (cursor < until && slots.length < 20) {
    const dow = cursor.getDay();

    if (!WORKING_DAYS.includes(dow)) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(START_HOUR, 0, 0, 0);
      continue;
    }
    if (cursor.getHours() < START_HOUR) {
      cursor.setHours(START_HOUR, 0, 0, 0);
    }
    if (cursor.getHours() >= END_HOUR) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(START_HOUR, 0, 0, 0);
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
        label:  cursor.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        time:   cursor.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        iso:    cursor.toISOString(),
        endIso: slotEnd.toISOString(),
      });
    }

    cursor.setMinutes(cursor.getMinutes() + SLOT_MINUTES);
  }
  return slots;
}
