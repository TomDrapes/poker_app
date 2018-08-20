export const UPDATE_POT = 'updatePot'

export function updatePot (newPot) {
    return {
        type: UPDATE_POT,
        payload: newPot
    }
}