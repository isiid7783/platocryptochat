// client/src/crypto/sessionManager.js
import * as libsignal from "libsignal"

export class SessionManager {
  constructor(store) {
    this.store = store
  }

  getAddress(userId, deviceId = 1) {
    return new libsignal.SignalProtocolAddress(userId, deviceId)
  }

  async sessionExists(userId) {
    const address = this.getAddress(userId)
    const record = await this.store.loadSession(address.toString())
    return !!record
  }

  async deleteSession(userId) {
    const address = this.getAddress(userId)
    await this.store.removeSession(address.toString())
  }

  async listSessions() {
    const keys = Object.keys(localStorage)
    return keys.filter(k => k.startsWith("session_"))
  }
}
