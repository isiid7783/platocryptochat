// client/src/crypto/messageDecryptor.js
export async function decryptMessage(ratchetManager, address, message) {
  return await ratchetManager.decrypt(address, message)
}
