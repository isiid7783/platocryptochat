// client/src/storage/messageStore.js
import { saveJSON, loadJSON } from "./persistence.js"

const KEY = "messages"

export function saveMessage(conversationId, message) {
  const data = loadJSON(KEY) || {}

  if (!data[conversationId]) {
    data[conversationId] = []
  }

  data[conversationId].push({
    ...message,
    timestamp: Date.now()
  })

  saveJSON(KEY, data)
}

export function loadMessages(conversationId) {
  const data = loadJSON(KEY) || {}
  return data[conversationId] || []
}
