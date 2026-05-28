/**
 * POST /api/contact
 * Sends a contact form notification email to Harsha via Resend.
 *
 * Env vars required:
 *   RESEND_API_KEY
 *
 * Request body (JSON):
 *   name     string  — visitor's name
 *   email    string  — visitor's email
 *   message  string  — their message
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to:   "hpolepeddi@gmail.com",
      subject: `New message from ${name}`,
      text: [
        `You have a new message from your portfolio site.`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
