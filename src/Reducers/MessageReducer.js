import { NEW_MSG } from '../Actions/MessageActions'

export default function messageReducer (state = null, action) {
  switch (action.type) {
    case NEW_MSG:
      return state.concat(action.payload)
    default:
      return state
  }
}
