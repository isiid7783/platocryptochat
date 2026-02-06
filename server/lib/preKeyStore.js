// server/lib/preKeyStore.js
import { loadJSON, saveJSON } from "./persistence.js"

const FILE = "prekeys.json"

export function savePreKey(userId, bundle) {
  const data = loadJSON(FILE)
  data[userId] = bundle
  saveJSON(FILE, data)
}

export function getPreKey(userId) {
  const data = loadJSON(FILE)
  return data[userId] || null
}
