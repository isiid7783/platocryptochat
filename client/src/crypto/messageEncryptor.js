// client/src/crypto/messageEncryptor.js
export async function encryptMessage(ratchetManager, address, text) {
  return await ratchetManager.encrypt(address, text)
}
