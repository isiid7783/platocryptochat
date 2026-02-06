// client/src/storage/sessionPersistence.js
import { saveJSON, loadJSON } from "./persistence.js"

const KEY = "sessions"

export function persistSession(addressString, record) {
  const data = loadJSON(KEY) || {}
  data[addressString] = record
  saveJSON(KEY, data)
}

export function restoreSession(addressString) {
  const data = loadJSON(KEY) || {}
  return data[addressString] || null
}

export function deleteSession(addressString) {
  const data = loadJSON(KEY) || {}
  delete data[addressString]
  saveJSON(KEY, data)
}
