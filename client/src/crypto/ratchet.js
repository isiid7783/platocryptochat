// client/src/crypto/ratchet.js
import * as libsignal from "libsignal"

export class RatchetManager {
  constructor(store) {
    this.store = store
  }

  async initSessionAsInitiator(remoteAddress, preKeyBundle) {
    const address = new libsignal.SignalProtocolAddress(
      remoteAddress.userId,
      remoteAddress.deviceId || 1
    )

    const sessionBuilder = new libsignal.SessionBuilder(this.store, address)

    await sessionBuilder.processPreKey(preKeyBundle)

    return address
  }

  async initSessionAsReceiver(remoteAddress) {
    const address = new libsignal.SignalProtocolAddress(
      remoteAddress.userId,
      remoteAddress.deviceId || 1
    )

    return address
  }

  async encrypt(address, plaintext) {
    const sessionCipher = new libsignal.SessionCipher(this.store, address)

    const ciphertext = await sessionCipher.encrypt(plaintext)

    return {
      type: ciphertext.type,
      body: ciphertext.body
    }
  }

  async decrypt(address, message) {
    const sessionCipher = new libsignal.SessionCipher(this.store, address)

    if (message.type === 3) {
      // PreKey message
      return await sessionCipher.decryptPreKeyWhisperMessage(
        message.body,
        "binary"
      )
    } else {
      // Normal message
      return await sessionCipher.decryptWhisperMessage(
        message.body,
        "binary"
      )
    }
  }

  async hasSession(address) {
    const sessionCipher = new libsignal.SessionCipher(this.store, address)
    const sessions = await sessionCipher.getRecord()
    return !!sessions
  }

  async closeSession(address) {
    await this.store.removeSession(address.toString())
  }
}
