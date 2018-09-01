export const UPDATE_FLOP = 'flop:updateFlop'
export const RESET_FLOP = 'resetFlop'

export function updateFlop (currentFlop) {
  return {
    type: UPDATE_FLOP,
    payload: currentFlop
  }
}

export function resetFlop () {
  return {
    type: RESET_FLOP,
    payload: []
  }
}
