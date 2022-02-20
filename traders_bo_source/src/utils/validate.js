/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAccount(str) {
  const reg = /^[0-9a-zA-Z_]{8,16}$/
  return reg.test(str)
}

// 只能由字母和数字组成
export function validPassword(str) {
  const reg = /^[a-zA-Z0-9]{8,16}$/
  return reg.test(str)
}

export function validPhone(str) {
  const reg = /^((11|12|13|14|15|16|17|18|19)\d{9}){1}$/
  return reg.test(str)
}
