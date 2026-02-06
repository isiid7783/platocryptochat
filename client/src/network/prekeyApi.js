// client/src/network/prekeyApi.js
export async function uploadPreKeyBundle(socket, userId, bundle) {
  socket.send(JSON.stringify({
    type: "upload_prekey",
    userId,
    bundle
  }))
}

export async function requestPreKeyBundle(socket, targetUserId) {
  socket.send(JSON.stringify({
    type: "get_prekey",
    targetUserId
  }))
}
