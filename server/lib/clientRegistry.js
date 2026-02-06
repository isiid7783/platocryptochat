// server/lib/clientRegistry.js
import { log } from "./logger.js"

const clients = new Map()

export function registerClient(userId, ws) {
  clients.set(userId, ws)
  log(`Client registered: ${userId}`)
}

export function unregisterClient(ws) {
  for (const [id, socket] of clients.entries()) {
    if (socket === ws) {
      clients.delete(id)
      log(`Client disconnected: ${id}`)
    }
  }
}

export function getClient(userId) {
  return clients.get(userId)
}
