// client/src/flow/receiveMessageFlow.js
import { RatchetManager } from "../crypto/ratchet.js"
import * as libsignal from "libsignal"

export async function handleIncomingMessage(
  store,
  data
) {
  const address = new libsignal.SignalProtocolAddress(
    data.from,
    1
  )

  const ratchet = new RatchetManager(store)

  const decrypted = await ratchet.decrypt(
    address,
    {
      type: data.type,
      body: data.body
    }
  )

  return decrypted
}
