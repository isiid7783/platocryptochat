export function saveMessages(chat, messages) {
  localStorage.setItem("chat_" + chat, JSON.stringify(messages))
}

export function loadMessages(chat) {
  const data = localStorage.getItem("chat_" + chat)
  return data ? JSON.parse(data) : []
}

