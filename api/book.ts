/**
 * POST /api/book
 * Creates a Google Calendar event with a Google Meet link and invites the visitor.
 *
 * Env vars required:
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
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
import { OAuth2Client } from "google-auth-library";

const TIMEZONE = "Asia/Kolkata";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message, slotIso, endIso } = req.body ?? {};

  if (!name || !email || !slotIso || !endIso) {
    return res.status(400).json({ error: "Missing required fields: name, email, slotIso, endIso" });
  }

  try {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    });

    const { token } = await oauth2Client.getAccessToken();

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
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    // conferenceDataVersion=1 tells Google to process the conferenceData and generate a Meet link.
    // sendUpdates=all sends Google's native calendar invite to the attendee.
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`;

    const gcalRes = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!gcalRes.ok) {
      const errText = await gcalRes.text();
      console.error("Google Calendar create error:", gcalRes.status, errText);
      return res.status(500).json({
        error: "Failed to create calendar event",
        detail: errText,
      });
    }

    const created = await gcalRes.json();
    const meetLink = created.conferenceData?.entryPoints?.find(
      (e: any) => e.entryPointType === "video"
    )?.uri ?? null;

    return res.status(200).json({
      success:   true,
      eventId:   created.id,
      eventLink: created.htmlLink ?? null,
      meetLink,
    });

  } catch (err) {
    console.error("Book handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
