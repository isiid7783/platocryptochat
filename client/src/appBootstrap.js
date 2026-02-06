// client/src/appBootstrap.js
import { SignalStore } from "./storage/keyStore.js"
import { initializeKeys } from "./initKeys.js"
import { createSocket } from "./network/websocket.js"

export async function bootstrap(userId) {

  const store = new SignalStore()

  const init = await initializeKeys()

  const socket = createSocket(userId)

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    // handle via receiveMessageFlow
  }

  return {
    store,
    socket
  }
}
