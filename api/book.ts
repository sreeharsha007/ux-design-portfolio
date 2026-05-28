/**
 * POST /api/book
 * Creates a Google Calendar event and sends invites to both parties.
 *
 * Env vars required:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_CALENDAR_ID
 *
 * Request body (JSON):
 *   name     string  — visitor's name
 *   email    string  — visitor's email
 *   message  string  — their project message (added to event description)
 *   slotIso  string  — ISO 8601 start time
 *   endIso   string  — ISO 8601 end time
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleAuth } from "google-auth-library";

const TIMEZONE = "Asia/Kolkata";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message, slotIso, endIso } = req.body ?? {};

  if (!name || !email || !slotIso || !endIso) {
    return res.status(400).json({ error: "Missing required fields: name, email, slotIso, endIso" });
  }

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const client      = await auth.getClient();
    const tokenResult = await (client as any).getAccessToken();
    const token       = tokenResult.token as string;

    const calendarId = process.env.GOOGLE_CALENDAR_ID!;

    const event = {
      summary: `Discovery Call — ${name}`,
      description: [
        "30-min discovery call booked via portfolio site.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        message ? `\nProject brief:\n${message}` : "",
      ].filter(Boolean).join("\n"),
      start: { dateTime: slotIso, timeZone: TIMEZONE },
      end:   { dateTime: endIso,  timeZone: TIMEZONE },
      // Visitor gets a calendar invite; the organiser (Harsha) sees it via the
      // calendar the service account has write-access to.
      // NOTE: conferenceData (Meet link) is intentionally omitted — Meet link
      // creation via API requires Google Workspace, not personal Gmail.
      attendees: [
        { email, displayName: name },
      ],
    };

    // sendUpdates=all → Google sends a calendar invite email to the visitor.
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`;

    const gcalRes = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!gcalRes.ok) {
      const errText = await gcalRes.text();
      console.error("Google Calendar create error:", gcalRes.status, errText);
      // Return Google's error detail so it's visible in the inline UI during debugging
      return res.status(500).json({
        error: "Failed to create calendar event",
        detail: errText,
      });
    }

    const created = await gcalRes.json();
    return res.status(200).json({
      success:   true,
      eventId:   created.id,
      eventLink: created.htmlLink ?? null,
    });

  } catch (err) {
    console.error("Book handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
