export const UPDATE_GAME_ID = 'updateGameId'
export const UPDATE_PLAYER_ID = 'updatePlayerId'
export const UPDATE_DECK = 'localState:updateDeck'
export const UPDATE_DATABASE = 'localState:updateDatabase'

export function updateGameId (id) {
  return {
    type: UPDATE_GAME_ID,
    payload: {
      gameId: id
    }
  }
}

export function updatePlayerId (id) {
  return {
    type: UPDATE_PLAYER_ID,
    payload: {
      playerId: id
    }
  }
}

export function updateDeck (newDeck) {
  return {
    type: UPDATE_DECK,
    payload: {
      deck: newDeck
    }
  }
}

export function updateDB (bool) {
  return {
    type: UPDATE_DATABASE,
    payload: {
      updateDB: bool
    }
  }
}

