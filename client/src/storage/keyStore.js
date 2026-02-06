// client/src/storage/keyStore.js
export class SignalStore {

  constructor() {
    this.store = {}
  }

  async put(key, value) {
    this.store[key] = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  async get(key) {
    if (this.store[key]) return this.store[key]

    const data = localStorage.getItem(key)
    if (!data) return null

    const parsed = JSON.parse(data)
    this.store[key] = parsed
    return parsed
  }

  async storePreKey(keyId, keyPair) {
    localStorage.setItem(`preKey_${keyId}`, JSON.stringify(keyPair))
  }

  async loadPreKey(keyId) {
    const data = localStorage.getItem(`preKey_${keyId}`)
    return data ? JSON.parse(data) : undefined
  }

  async storeSignedPreKey(keyId, keyPair) {
    localStorage.setItem(`signedPreKey_${keyId}`, JSON.stringify(keyPair))
  }

  async loadSignedPreKey(keyId) {
    const data = localStorage.getItem(`signedPreKey_${keyId}`)
    return data ? JSON.parse(data) : undefined
  }
}
