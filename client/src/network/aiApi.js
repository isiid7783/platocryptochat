// client/src/network/aiApi.js
export async function analyzeWithAI(conversationId, sender, message) {
  const res = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation_id: conversationId,
      sender,
      message
    })
  })

  return await res.json()
}
