// client/src/flow/groupInitFlow.js
import { GroupManager } from "../features/groupManager.js"

export async function initGroupFlow(
  store,
  socket,
  myUserId,
  groupId,
  members
) {
  const groupManager = new GroupManager(store, socket, myUserId)

  groupManager.createGroup(groupId, members)

  await groupManager.distributeSenderKey(groupId)

  return groupManager
}
