// client/src/crypto/identity.js
import * as libsignal from "libsignal"

export async function generateIdentity(store) {
  const identityKeyPair = await libsignal.KeyHelper.generateIdentityKeyPair()
  const registrationId = libsignal.KeyHelper.generateRegistrationId()

  await store.put("identityKey", identityKeyPair)
  await store.put("registrationId", registrationId)

  return {
    identityKeyPair,
    registrationId
  }
}
