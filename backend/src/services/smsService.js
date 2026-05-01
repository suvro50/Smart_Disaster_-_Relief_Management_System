import axios from "axios";

const BULK_SMS_BASE_URL = process.env.BULK_SMS_BASE_URL || "http://bulksmsbd.net/api";
const BULK_SMS_API_KEY = process.env.BULK_SMS_API_KEY || "";
const BULK_SMS_SENDER_ID = process.env.BULK_SMS_SENDER_ID || "DisasterAlert";

export async function sendSMS({ to, message }) {
  if (!BULK_SMS_API_KEY) {
    console.warn("[smsService] SMS API key not configured. Skipping SMS send.");
    return { skipped: true };
  }
  try {
    const response = await axios.post(BULK_SMS_BASE_URL, {
      api_key: BULK_SMS_API_KEY,
      senderid: BULK_SMS_SENDER_ID,
      number: to,
      message: message.substring(0, 160),
    });
    console.log(`[smsService] SMS sent to ${to}`);
    return response.data;
  } catch (err) {
    console.error(`[smsService] Failed to send SMS to ${to}: ${err.message}`);
    throw err;
  }
}

export async function sendBroadcastSMS(recipients, message) {
  if (!recipients.length) return [];
  const numbers = recipients.join(",");
  try {
    const result = await sendSMS({ to: numbers, message });
    return { success: true, count: recipients.length, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export function formatAlertSMS(alert) {
  const severity = alert.severity?.toUpperCase() || "WARNING";
  const title = alert.title || "Disaster Alert";
  const msg = alert.message || "";
  return `🚨 ${severity}: ${title}. ${msg}`.substring(0, 160);
}
