// client/src/network/messageApi.js
export function sendEncryptedMessage(socket, from, to, payload) {
  socket.send(JSON.stringify({
    type: "message",
    from,
    to,
    ...payload
  }))
}
