import { UPDATE_LAST_MOVE } from '../Actions/MoveActions'

export default function moveReducer (state = '', action) {
  switch (action.type) {
    case UPDATE_LAST_MOVE:
      return action.payload
    default:
      return state
  }
}
