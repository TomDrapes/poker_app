import { UPDATE_MINIMUM_BET, UPDATE_TOTAL_BET_REQUIRED } from '../Actions/BetActions'

export default function betReducer (state = {}, action = {}) {

  switch (action.type) {

    case UPDATE_MINIMUM_BET:
      return {
        minimum: action.payload.minimum,
        totalRequired: state.totalRequired
      }

    case UPDATE_TOTAL_BET_REQUIRED:
      return {
        minimum: state.minimum,
        totalRequired: action.payload.totalRequired
      }

    default:
      return state
  }
}
