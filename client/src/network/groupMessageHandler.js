// client/src/network/groupMessageHandler.js
import { GroupManager } from "../features/groupManager.js"

export function attachGroupHandlers(socket, groupManager) {

  socket.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data)

    if (data.type === "group_sender_key") {
      await groupManager.receiveSenderKey(
        data.groupId,
        data.from,
        data.senderKey
      )
    }

    if (data.type === "group_message") {
      const decrypted = await groupManager.decryptGroupMessage(
        data.groupId,
        data.from,
        data.payload
      )

      console.log("Group message:", decrypted)
    }
  })
}
