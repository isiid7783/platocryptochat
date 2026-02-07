export function loadFriends() {
  const data = localStorage.getItem("friends")
  return data ? JSON.parse(data) : []
}

export function addFriend(name) {
  const friends = loadFriends()
  if (!friends.includes(name)) {
    friends.push(name)
    localStorage.setItem("friends", JSON.stringify(friends))
  }
}
