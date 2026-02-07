import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

const clients = new Map()

wss.on("connection", (ws) => {

  ws.on("message", (raw) => {
    const data = JSON.parse(raw)

    if (data.type === "register") {
      clients.set(data.user, ws)
      return
    }

    if (data.type === "message") {
      const target = clients.get(data.to)
      if (target) {
        target.send(JSON.stringify(data))
      }
    }
  })

  ws.on("close", () => {
    for (const [user, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(user)
      }
    }
  })
})

console.log("Server running")

