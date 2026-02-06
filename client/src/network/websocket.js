// client/src/network/websocket.js
export function createSocket(userId) {
  const ws = new WebSocket("ws://localhost:8080")

  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: "register",
      userId
    }))
  }

  return ws
}
