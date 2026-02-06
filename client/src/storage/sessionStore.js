// client/src/storage/sessionStore.js
export async function storeSession(store, address, record) {
  localStorage.setItem(
    `session_${address.toString()}`,
    JSON.stringify(record)
  )
}

export async function loadSession(address) {
  const data = localStorage.getItem(
    `session_${address.toString()}`
  )
  return data ? JSON.parse(data) : null
}

export async function removeSession(address) {
  localStorage.removeItem(
    `session_${address.toString()}`
  )
}
