import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {}
  const { name = "", email = "", message = "" } = data;

  if (!name || !email || !message) {
    return { statusCode: 400, body: "Missing fields" };
  }

  const hook = process.env.SLACK_WEBHOOK_URL;
  if (!hook) {
    return { statusCode: 500, body: "Missing SLACK_WEBHOOK_URL" };
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: `🟦 New Wells Systems lead\n• Name: ${name}\n• Email: ${email}\n• Message: ${message}`
    })
  });

  if (!res.ok) {
    return { statusCode: 500, body: "Failed to send" };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
