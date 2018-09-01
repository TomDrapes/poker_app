import { UPDATE_POT } from '../Actions/PotActions'

export default function potReducer (state = 0, action) {
  switch (action.type) {
    case UPDATE_POT:
      return action.payload
    default:
      return state
  }
}
