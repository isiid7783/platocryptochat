// client/src/crypto/prekey.js
import * as libsignal from "libsignal"

export async function generatePreKeys(store, count = 10) {
  const preKeys = []

  for (let i = 1; i <= count; i++) {
    const key = await libsignal.KeyHelper.generatePreKey(i)
    await store.storePreKey(key.keyId, key.keyPair)
    preKeys.push({
      keyId: key.keyId,
      publicKey: key.keyPair.pubKey
    })
  }

  return preKeys
}

export async function generateSignedPreKey(store, identityKeyPair) {
  const signedPreKey = await libsignal.KeyHelper.generateSignedPreKey(
    identityKeyPair,
    1
  )

  await store.storeSignedPreKey(
    signedPreKey.keyId,
    signedPreKey.keyPair
  )

  return {
    keyId: signedPreKey.keyId,
    publicKey: signedPreKey.keyPair.pubKey,
    signature: signedPreKey.signature
  }
}
