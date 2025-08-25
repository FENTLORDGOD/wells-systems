export async function handler() 
  return {
    statusCode: 200,
    eaders: { "content-type": "application/json" },
    body: JSON.stringify({ ok: true, msg: "Wells Systems API online" })
  };
}
