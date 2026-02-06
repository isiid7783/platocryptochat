// client/src/crypto/rotationScheduler.js
import { rotateSignedPreKey, rotateOneTimePreKeys } from "./keyRotation.js"

export function startKeyRotationScheduler(store, socket, userId) {

  setInterval(async () => {

    const signedPreKey = await rotateSignedPreKey(store)
    const oneTimePreKeys = await rotateOneTimePreKeys(store)

    socket.send(JSON.stringify({
      type: "upload_prekey",
      userId,
      bundle: {
        signedPreKey,
        oneTimePreKeys
      }
    }))

  }, 24 * 60 * 60 * 1000) // 24時間ごと

}
