// client/src/flow/persistenceInit.js
import { loadMessages } from "../storage/messageStore.js"

export function restoreConversation(conversationId) {
  return loadMessages(conversationId)
}
