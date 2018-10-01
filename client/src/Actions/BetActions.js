import axios from 'axios'
export const UPDATE_BET = 'updateBet'


export function updateBet (raisedBet) {
  //axios.put('/api/gamestate').then(res => console.log(res));
  return {
    type: UPDATE_BET,
    payload: raisedBet
  }
}
