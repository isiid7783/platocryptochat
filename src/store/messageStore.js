export function loadMessages(friend) {
  const data = localStorage.getItem("chat_" + friend)
  return data ? JSON.parse(data) : []
}

export function saveMessages(friend, messages) {
  localStorage.setItem("chat_" + friend, JSON.stringify(messages))
}
