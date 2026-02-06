// client/src/features/groupManager.js
import * as libsignal from "libsignal"
import { RatchetManager } from "../crypto/ratchet.js"

export class GroupManager {
  constructor(store, socket, myUserId) {
    this.store = store
    this.socket = socket
    this.myUserId = myUserId
    this.groups = JSON.parse(localStorage.getItem("groups") || "{}")
  }

  createGroup(groupId, members) {
    this.groups[groupId] = {
      members,
      senderKeys: {}
    }
    localStorage.setItem("groups", JSON.stringify(this.groups))
  }

  async distributeSenderKey(groupId) {
    const group = this.groups[groupId]
    const senderKey = await libsignal.KeyHelper.generatePreKey(Date.now())

    group.senderKeys[this.myUserId] = senderKey.keyPair
    localStorage.setItem("groups", JSON.stringify(this.groups))

    for (const member of group.members) {
      if (member === this.myUserId) continue

      this.socket.send(JSON.stringify({
        type: "group_sender_key",
        groupId,
        to: member,
        from: this.myUserId,
        senderKey: {
          keyId: senderKey.keyId,
          pubKey: senderKey.keyPair.pubKey
        }
      }))
    }
  }

  async receiveSenderKey(groupId, fromUserId, senderKey) {
    if (!this.groups[groupId]) return

    this.groups[groupId].senderKeys[fromUserId] = {
      pubKey: senderKey.pubKey
    }

    localStorage.setItem("groups", JSON.stringify(this.groups))
  }

  async encryptGroupMessage(groupId, plaintext) {
    const group = this.groups[groupId]
    const senderKey = group.senderKeys[this.myUserId]

    const ratchet = new RatchetManager(this.store)

    const encrypted = await ratchet.encrypt(
      new libsignal.SignalProtocolAddress(this.myUserId, 1),
      plaintext
    )

    for (const member of group.members) {
      if (member === this.myUserId) continue

      this.socket.send(JSON.stringify({
        type: "group_message",
        groupId,
        to: member,
        from: this.myUserId,
        payload: encrypted
      }))
    }

    return encrypted
  }

  async decryptGroupMessage(groupId, fromUserId, payload) {
    const address = new libsignal.SignalProtocolAddress(
      fromUserId,
      1
    )

    const ratchet = new RatchetManager(this.store)

    return await ratchet.decrypt(address, payload)
  }
}
