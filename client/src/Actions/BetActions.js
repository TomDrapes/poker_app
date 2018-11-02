export const UPDATE_MINIMUM_BET = 'updateMinimumBet'
export const UPDATE_TOTAL_BET_REQUIRED = 'updateTotalBetRequired'

export function updateMinimumBet (raisedBet) {
  return {
    type: UPDATE_MINIMUM_BET,
    payload: { minimum: raisedBet }
  }
}

export function updateTotalBetsRequired (updatedBetAmount) {
  return {
    type: UPDATE_TOTAL_BET_REQUIRED,
    payload: { totalRequired: updatedBetAmount }
  }
}
