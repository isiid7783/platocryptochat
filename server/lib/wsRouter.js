// server/lib/wsRouter.js
import { registerClient, unregisterClient, getClient } from "./clientRegistry.js"
import { savePreKey, getPreKey } from "./preKeyStore.js"
import { queueMessage, popMessages } from "./messageQueue.js"
import { log } from "./logger.js"

export function handleConnection(ws) {

  ws.on("message", (raw) => {
    const data = JSON.parse(raw)

    switch (data.type) {

      case "register":
        registerClient(data.userId, ws)
        const offline = popMessages(data.userId)
        offline.forEach(msg => ws.send(JSON.stringify(msg)))
        break

      case "upload_prekey":
        savePreKey(data.userId, data.bundle)
        log(`PreKey uploaded for ${data.userId}`)
        break

      case "get_prekey":
        const bundle = getPreKey(data.targetUserId)
        ws.send(JSON.stringify({
          type: "prekey_bundle",
          targetUserId: data.targetUserId,
          bundle
        }))
        break

      case "message":
        const targetSocket = getClient(data.to)
        if (targetSocket) {
          targetSocket.send(JSON.stringify(data))
        } else {
          queueMessage(data.to, data)
        }
        break
    }
  })

  ws.on("close", () => {
    unregisterClient(ws)
  })
}
