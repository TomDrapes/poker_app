import { UPDATE_PLAYER, UPDATE_TURN } from '../Actions/PlayersActions'

export default function playersReducer (state = [], action = {}) {
  switch (action.type) {
    case UPDATE_PLAYER:
      return action.payload.players
    case UPDATE_TURN:
      const updatedTurn = state.map(player => {
        if(player.name === action.name){          
          return {
            ...player,
            playersTurn: action.payload}
        }        
        return player
      })      
      return updatedTurn
    default:
      return state
  }
}
