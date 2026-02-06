// client/src/flow/aiMessageHook.js
import { processMessageWithAI } from "../features/aiIntegration.js"

export async function aiHook(
  conversationId,
  sender,
  message
) {
  try {
    const analysis = await processMessageWithAI(
      conversationId,
      sender,
      message
    )

    console.log("AI analysis:", analysis)
  } catch (e) {
    console.error("AI error:", e)
  }
}
