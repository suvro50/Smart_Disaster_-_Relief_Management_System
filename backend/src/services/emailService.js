import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function sendAlertEmail({ to, subject, html, text }) {
  if (!process.env.SMTP_USER) {
    console.warn("[emailService] SMTP not configured. Skipping email send.");
    return { skipped: true };
  }
  try {
    const info = await transporter.sendMail({
      from: `"Disaster Alert" <${process.env.SMTP_USER}>`,
      to,
      subject: subject || "Disaster Alert",
      html: html || text || "No content",
      text: text || "",
    });
    console.log(`[emailService] Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`[emailService] Failed to send email: ${err.message}`);
    throw err;
  }
}

export async function sendBroadcastEmail(recipients, { subject, html, text }) {
  if (!recipients.length) return [];
  const results = [];
  for (const email of recipients) {
    try {
      const info = await sendAlertEmail({ to: email, subject, html, text });
      results.push({ email, status: "sent", info });
    } catch (err) {
      results.push({ email, status: "failed", error: err.message });
    }
  }
  return results;
}

export async function sendVerificationEmail(to, token) {
  const verifyUrl = `${env.clientUrl}/verify?token=${token}`;
  return sendAlertEmail({
    to,
    subject: "Verify your account - Smart Disaster Relief",
    html: `<h2>Welcome to Smart Disaster Relief!</h2><p>Click below to verify your email:</p><a href="${verifyUrl}" style="background:#ef4444;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Verify Email</a><p>If you didn't register, ignore this email.</p>`,
    text: `Verify your email: ${verifyUrl}`,
  });
}
