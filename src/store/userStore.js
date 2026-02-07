export function loadUser() {
  return localStorage.getItem("me")
}

export function saveUser(user) {
  localStorage.setItem("me", user)
}
