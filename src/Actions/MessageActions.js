export const NEW_MSG = 'newMsg'

export function newMsg (msg) {
  return {
    type: NEW_MSG,
    payload: msg
  }
}
