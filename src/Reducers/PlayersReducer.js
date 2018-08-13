import { UPDATE_PLAYER, UPDATE_HAND } from '../Actions/PlayersActions'

export default function playersReducer (state = [], { type, payload }) {
  switch (type) {
    case UPDATE_PLAYER:
      return payload.players
    case UPDATE_HAND:
      return state.updateIn(['players'], x => x.set('hand', payload.hand))
    default:
      return state
  }
}
