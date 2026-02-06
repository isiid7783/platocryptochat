// client/src/flow/sendMessageFlow.js
import { sendEncryptedMessage } from "../network/messageApi.js"

export async function sendMessageFlow(
  ratchet,
  address,
  socket,
  fromUserId,
  toUserId,
  plaintext
) {
  const encrypted = await ratchet.encrypt(address, plaintext)

  sendEncryptedMessage(socket, fromUserId, toUserId, encrypted)
}
