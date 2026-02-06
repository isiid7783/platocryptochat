// client/src/crypto/incomingSessionHandler.js
import { RatchetManager } from "./ratchet.js"

export async function handleIncomingPreKeyMessage(
  store,
  remoteAddress,
  message
) {
  const ratchet = new RatchetManager(store)

  await ratchet.initSessionAsReceiver(remoteAddress)

  return await ratchet.decrypt(remoteAddress, message)
}
