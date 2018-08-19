import $ from 'jquery'

export const UPDATE_PLAYER = 'players:updatePlayer'
export const UPDATE_TURN= 'players:updatePlayersTurn'


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
