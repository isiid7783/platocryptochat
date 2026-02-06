// server/lib/messageQueue.js
import { loadJSON, saveJSON } from "./persistence.js"

const FILE = "messages.json"

export function queueMessage(userId, message) {
  const data = loadJSON(FILE)
  if (!data[userId]) data[userId] = []
  data[userId].push(message)
  saveJSON(FILE, data)
}

export function popMessages(userId) {
  const data = loadJSON(FILE)
  const messages = data[userId] || []
  delete data[userId]
  saveJSON(FILE, data)
  return messages
}
