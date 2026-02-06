// client/src/storage/persistence.js
export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadJSON(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export function removeJSON(key) {
  localStorage.removeItem(key)
}
