export const NEW_MSG = 'newMsg'
export const UPDATE_MESSAGES = 'updateMessages'

export function newMsg (msg) {
  return {
    type: NEW_MSG,
    payload: msg
  }
}

export function updateMessages (messages) {
  return {
    type: UPDATE_MESSAGES,
    payload: messages
  }
}
