// client/src/flow/sessionHandshake.js
import { RatchetManager } from "../crypto/ratchet.js"
import * as libsignal from "libsignal"

export async function initiateSession(
  store,
  socket,
  myUserId,
  targetUserId
) {
  return new Promise((resolve) => {

    socket.send(JSON.stringify({
      type: "get_prekey",
      targetUserId
    }))

    socket.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data)

      if (data.type === "prekey_bundle" &&
          data.targetUserId === targetUserId) {

        const address = new libsignal.SignalProtocolAddress(
          targetUserId,
          1
        )

        const ratchet = new RatchetManager(store)

        await ratchet.initSessionAsInitiator(
          { userId: targetUserId, deviceId: 1 },
          data.bundle
        )

        resolve({ ratchet, address })
      }
    })
  })
}
