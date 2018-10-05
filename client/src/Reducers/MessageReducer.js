import { NEW_MSG, UPDATE_MESSAGES } from '../Actions/MessageActions'

export default function messageReducer (state = [], action) {
  switch (action.type) {
    case NEW_MSG:
      return state.concat(action.payload)

    case UPDATE_MESSAGES:
      return action.payload

    default:
      return state
  }
}
