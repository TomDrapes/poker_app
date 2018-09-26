import {
  UPDATE_PLAYER,
  UPDATE_TURN,
  UPDATE_CHIP_COUNT,
  WON_POT
} from '../Actions/PlayersActions'

export default function playersReducer (state = [], action = {}) {
  switch (action.type) {
    case UPDATE_PLAYER:
      return action.payload.players
    case UPDATE_TURN:
      const updatedTurn = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            playersTurn: action.payload}
        }
        return player
      })
      return updatedTurn
    case UPDATE_CHIP_COUNT:
      const updatedChipCount = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            chipCount: action.payload
          }
        }
        return player
      })
      return updatedChipCount
    case WON_POT:
      const wonPot = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            chipCount: action.payload
          }
        }
        return player
      })
      return wonPot
    default:
      return state
  }
}
