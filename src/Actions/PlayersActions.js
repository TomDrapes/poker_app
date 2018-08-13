import $ from 'jquery'

export const UPDATE_PLAYER = 'players:updatePlayer'
export const UPDATE_HAND = 'players:updateHand'

export function updatePlayer (newPlayer) {
  return {
    type: UPDATE_PLAYER,
    payload: {
      players: newPlayer
    }
  }
}

export function updateHand (newHand) {
  return {
    type: UPDATE_HAND,
    payload: {
      hand: newHand
    }
  }
}

export function apiRequest () {
  return dispatch => {
    $.ajax({
      url: 'http://google.com',
      success (response) {
        console.log('SUCESS')

        dispatch(updatePlayer(response.newPlayer))
      },
      error () {
        console.log('ERROR')
        
      }
    })
  }
}
