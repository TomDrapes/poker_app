export const UPDATE_BET = 'updateBet'

export function updateBet (raisedBet) {
  return {
    type: UPDATE_BET,
    payload: raisedBet
  }
}
