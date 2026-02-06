// server/server.js
import { WebSocketServer } from "ws"
import config from "./config/config.js"
import { handleConnection } from "./lib/wsRouter.js"
import fs from "fs"

if (!fs.existsSync("./logs")) {
  fs.mkdirSync("./logs")
}

const wss = new WebSocketServer({ port: config.PORT })

wss.on("connection", (ws) => {
  handleConnection(ws)
})

console.log(`Plato Secure Server running on ${config.PORT}`)
