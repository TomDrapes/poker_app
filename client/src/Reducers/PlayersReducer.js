import {
  UPDATE_PLAYER,
  UPDATE_TURN,
  DECREASE_CHIP_COUNT,
  INCREASE_CHIP_COUNT,
  UPDATE_BET_AMOUNT_SO_FAR
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

    case DECREASE_CHIP_COUNT:
      const decreaseChipCount = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            chipCount: action.payload
          }
        }
        return player
      })
      return decreaseChipCount

    case INCREASE_CHIP_COUNT:
      const increaseChipCount = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            chipCount: action.payload
          }
        }
        return player
      })
      return increaseChipCount

    case UPDATE_BET_AMOUNT_SO_FAR:
      const betAmountSoFar = state.map(player => {
        if (player.name === action.name) {
          return {
            ...player,
            betAmountSoFar: action.payload
          }
        }
        return player
      })
      return betAmountSoFar

    default:
      return state
  }
}
