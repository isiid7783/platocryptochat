// client/src/crypto/ratchetInitFlow.js
import { RatchetManager } from "./ratchet.js"

export async function establishSession(
  store,
  remoteAddress,
  preKeyBundle
) {
  const ratchet = new RatchetManager(store)

  await ratchet.initSessionAsInitiator(
    remoteAddress,
    preKeyBundle
  )

  return ratchet
}
