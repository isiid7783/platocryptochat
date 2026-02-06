// client/src/initKeys.js
import { SignalStore } from "./storage/keyStore.js"
import { generateIdentity } from "./crypto/identity.js"
import { generatePreKeys, generateSignedPreKey } from "./crypto/prekey.js"

export async function initializeKeys() {
  const store = new SignalStore()

  const existingIdentity = await store.get("identityKey")
  if (existingIdentity) {
    return store
  }

  const { identityKeyPair, registrationId } = await generateIdentity(store)

  const preKeys = await generatePreKeys(store, 10)
  const signedPreKey = await generateSignedPreKey(store, identityKeyPair)

  return {
    store,
    bundle: {
      registrationId,
      identityKey: identityKeyPair.pubKey,
      signedPreKey,
      preKeys
    }
  }
}
