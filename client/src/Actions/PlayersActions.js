export const UPDATE_PLAYER = 'players:updatePlayer'
export const UPDATE_TURN = 'players:updatePlayersTurn'
export const DECREASE_CHIP_COUNT = 'decreaseChipCount'
export const INCREASE_CHIP_COUNT = 'increaseChipCount'
export const UPDATE_BET_AMOUNT_SO_FAR = 'updateBetAmountSoFar'

export function updatePlayer (newPlayer) {
  return {
    type: UPDATE_PLAYER,
    payload: {
      players: newPlayer
    }
  }
}

export function updatePlayersTurn (player) {
  return {
    type: UPDATE_TURN,
    name: player.name,
    payload: !player.playersTurn
  }
}

export function decreaseChipCount (player, count) {
  return {
    type: DECREASE_CHIP_COUNT,
    name: player.name,
    payload: player.chipCount - count
  }
}

export function increaseChipCount (player, pot) {
  return {
    type: INCREASE_CHIP_COUNT,
    name: player.name,
    payload: player.chipCount + pot
  }
}

export function updateBetAmountSoFar (player, bet) {
  return {
    type: UPDATE_BET_AMOUNT_SO_FAR,
    name: player.name,
    payload: player.betAmountSoFar + bet
  }
}
