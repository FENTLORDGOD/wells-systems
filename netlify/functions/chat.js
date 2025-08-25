import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { messages } = JSON.parse(event.body || "{}");
  if (!Array.isArray(messages)) {
    return { statusCode: 400, body: "messages must be an array" };
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { statusCode: 500, body: "Missing OPENAI_API_KEY" };
  }

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4
    })
  });

  if (!r.ok) {
    return { statusCode: r.status, body: await r.text() };
  }
  return { statusCode: 200, body: await r.text() };
}
