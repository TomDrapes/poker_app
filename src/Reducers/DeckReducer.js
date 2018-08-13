import { UPDATE_DECK } from '../Actions/DeckActions'

export default function deckReducer (state = [], { type, payload }) {
  switch (type) {
    case UPDATE_DECK:
      return payload.deck
    default:
      return state
  }
}
