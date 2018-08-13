export const UPDATE_DECK = 'deck:updateDeck'

export function updateDeck (newDeck) {
  return {
    type: UPDATE_DECK,
    payload: {
      deck: newDeck
    }
  }
}
