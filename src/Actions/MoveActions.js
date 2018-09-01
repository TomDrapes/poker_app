export const UPDATE_LAST_MOVE = 'updateLastMove'

export function updateLastMove (newMove) {
  return {
    type: UPDATE_LAST_MOVE,
    payload: newMove
  }
}
