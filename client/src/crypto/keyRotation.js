// client/src/crypto/keyRotation.js
import * as libsignal from "libsignal"

export async function rotateSignedPreKey(store) {
  const identityKey = await store.get("identityKey")

  const newSignedPreKey =
    await libsignal.KeyHelper.generateSignedPreKey(
      identityKey,
      Date.now()
    )

  await store.storeSignedPreKey(
    newSignedPreKey.keyId,
    newSignedPreKey.keyPair
  )

  return {
    keyId: newSignedPreKey.keyId,
    publicKey: newSignedPreKey.keyPair.pubKey,
    signature: newSignedPreKey.signature
  }
}

export async function rotateOneTimePreKeys(store, count = 5) {
  const keys = []

  for (let i = 0; i < count; i++) {
    const key =
      await libsignal.KeyHelper.generatePreKey(Date.now() + i)

    await store.storePreKey(key.keyId, key.keyPair)

    keys.push({
      keyId: key.keyId,
      publicKey: key.keyPair.pubKey
    })
  }

  return keys
}
