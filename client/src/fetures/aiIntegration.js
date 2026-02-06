// client/src/features/aiIntegration.js
import { analyzeWithAI } from "../network/aiApi.js"
import { saveJSON, loadJSON } from "../storage/persistence.js"

const AI_KEY = "ai_analysis"

export async function processMessageWithAI(
  conversationId,
  sender,
  message
) {
  const result = await analyzeWithAI(
    conversationId,
    sender,
    message
  )

  const existing = loadJSON(AI_KEY) || {}
  if (!existing[conversationId]) {
    existing[conversationId] = []
  }

  existing[conversationId].push(result)
  saveJSON(AI_KEY, existing)

  return result
}
