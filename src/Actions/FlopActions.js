export const UPDATE_FLOP = 'flop:updateFlop'

export function updateFlop (currentFlop) {
    return {
        type: UPDATE_FLOP,
        payload: {
            flop: currentFlop
        }
    }
}