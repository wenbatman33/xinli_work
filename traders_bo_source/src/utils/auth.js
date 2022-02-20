const TokenKey = 'JWT_TOKEN'
const UserKey = 'User'

export function getToken() {
  return window.localStorage[TokenKey]
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

export function getUser() {
  return JSON.parse(window.localStorage[UserKey])
}

export function setUser(user) {
  return window.localStorage.setItem(UserKey, JSON.stringify(user))
}

export function removeUser() {
  return window.localStorage.removeItem(UserKey)
}
