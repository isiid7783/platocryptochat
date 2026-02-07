export function createSocket(user, onMessage) {
  const ws = new WebSocket("ws://localhost:8080")

  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: "register",
      user
    }))
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }

  return ws
}


