export const UPDATE_DECK = 'updateDeck'

export function updateDeck (newDeck) {
  return {
    type: UPDATE_DECK,
    payload: {
      deck: newDeck
    }
  }
}
