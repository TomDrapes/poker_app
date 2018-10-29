import { UPDATE_GAME_ID, UPDATE_PLAYER_ID, UPDATE_DECK, UPDATE_DATABASE } from '../Actions/LocalStateActions'

export default function localStateReducer (state = {}, action = {}) {
  switch (action.type) {

    case UPDATE_GAME_ID:
      return {
        gameId: action.payload.gameId,
        playerId: state.playerId,
        deck: state.deck,
        updateDB: state.updateDB
      }

    case UPDATE_PLAYER_ID:
      return {
        gameId: state.gameId,
        playerId: action.payload.playerId,
        deck: state.deck,
        updateDB: state.updateDB
      }

    case UPDATE_DECK:
      return {
        gameId: state.gameId,
        playerId: state.playerId,
        deck: action.payload.deck,
        updateDB: state.updateDB
      }

    case UPDATE_DATABASE:
      return {
        gameId: state.gameId,
        playerId: state.playerId,
        deck: state.deck,
        updateDB: action.payload.updateDB
      }

    default:
      return state
  }
}
