import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import playersReducer from './Reducers/PlayersReducer'
import deckReducer from './Reducers/DeckReducer'
import flopReducer from './Reducers/FlopReducer'
import betReducer from './Reducers/BetReducer'
import moveReducer from './Reducers/MoveReducer'
import potReducer from './Reducers/PotReducer'
import messageReducer from './Reducers/MessageReducer'
import thunk from 'redux-thunk'

import Card from './components/game/card'

// Redux: reducers
const allReducers = combineReducers({
  players: playersReducer,
  deck: deckReducer,
  flop: flopReducer,
  bet: betReducer,
  lastMove: moveReducer,
  pot: potReducer,
  messages: messageReducer
})

// Redux middleware
const allStoreEnhancers = compose(
  applyMiddleware(thunk), // has to come first or won't work
  window.devToolsExtension && window.devToolsExtension() // Disable this in production
)

// Create initial store
const store = createStore(
  allReducers,
  {
    players: [
      { name: 'PlayerOne',
        hand: [],
        folded: false,
        hasDealerChip: true,
        playersTurn: false,
        chipCount: 200 },
      { name: 'PlayerTwo',
        hand: [],
        folded: false,
        hasDealerChip: false,
        playersTurn: true,
        chipCount: 200 }
    ],
    deck: [
      { card: <Card key={1} image={require('./images/ACE-H.png')} />, value: 14, suit: 'HEART' },
      { card: <Card key={2} image={require('./images/KING-H.png')} />, value: 13, suit: 'HEART' },
      { card: <Card key={3} image={require('./images/QUEEN-H.png')} />, value: 12, suit: 'HEART' },
      { card: <Card key={4} image={require('./images/JACK-H.png')} />, value: 11, suit: 'HEART' },
      { card: <Card key={5} image={require('./images/10-H.png')} />, value: 10, suit: 'HEART' },
      { card: <Card key={6} image={require('./images/9-H.png')} />, value: 9, suit: 'HEART' },
      { card: <Card key={7} image={require('./images/8-H.png')} />, value: 8, suit: 'HEART' },
      { card: <Card key={8} image={require('./images/7-H.png')} />, value: 7, suit: 'HEART' },
      { card: <Card key={9} image={require('./images/6-H.png')} />, value: 6, suit: 'HEART' },
      { card: <Card key={10} image={require('./images/5-H.png')} />, value: 5, suit: 'HEART' },
      { card: <Card key={11} image={require('./images/4-H.png')} />, value: 4, suit: 'HEART' },
      { card: <Card key={12} image={require('./images/3-H.png')} />, value: 3, suit: 'HEART' },
      { card: <Card key={13} image={require('./images/2-H.png')} />, value: 2, suit: 'HEART' },
      { card: <Card key={14} image={require('./images/ACE-D.png')} />, value: 14, suit: 'DIAMOND' },
      { card: <Card key={15} image={require('./images/KING-D.png')} />, value: 13, suit: 'DIAMOND' },
      { card: <Card key={16} image={require('./images/QUEEN-D.png')} />, value: 12, suit: 'DIAMOND' },
      { card: <Card key={17} image={require('./images/JACK-D.png')} />, value: 11, suit: 'DIAMOND' },
      { card: <Card key={18} image={require('./images/10-D.png')} />, value: 10, suit: 'DIAMOND' },
      { card: <Card key={19} image={require('./images/9-D.png')} />, value: 9, suit: 'DIAMOND' },
      { card: <Card key={20} image={require('./images/8-D.png')} />, value: 8, suit: 'DIAMOND' },
      { card: <Card key={21} image={require('./images/7-D.png')} />, value: 7, suit: 'DIAMOND' },
      { card: <Card key={22} image={require('./images/6-D.png')} />, value: 6, suit: 'DIAMOND' },
      { card: <Card key={23} image={require('./images/5-D.png')} />, value: 5, suit: 'DIAMOND' },
      { card: <Card key={24} image={require('./images/4-D.png')} />, value: 4, suit: 'DIAMOND' },
      { card: <Card key={25} image={require('./images/3-D.png')} />, value: 3, suit: 'DIAMOND' },
      { card: <Card key={26} image={require('./images/2-D.png')} />, value: 2, suit: 'DIAMOND' },
      { card: <Card key={27} image={require('./images/ACE-C.png')} />, value: 14, suit: 'CLUB' },
      { card: <Card key={28} image={require('./images/KING-C.png')} />, value: 13, suit: 'CLUB' },
      { card: <Card key={28} image={require('./images/KING-C.png')} />, value: 13, suit: 'CLUB' },
      { card: <Card key={29} image={require('./images/QUEEN-C.png')} />, value: 12, suit: 'CLUB' },
      { card: <Card key={30} image={require('./images/JACK-C.png')} />, value: 11, suit: 'CLUB' },
      { card: <Card key={31} image={require('./images/10-C.png')} />, value: 10, suit: 'CLUB' },
      { card: <Card key={32} image={require('./images/9-C.png')} />, value: 9, suit: 'CLUB' },
      { card: <Card key={33} image={require('./images/8-C.png')} />, value: 8, suit: 'CLUB' },
      { card: <Card key={34} image={require('./images/7-C.png')} />, value: 7, suit: 'CLUB' },
      { card: <Card key={35} image={require('./images/6-C.png')} />, value: 6, suit: 'CLUB' },
      { card: <Card key={36} image={require('./images/5-C.png')} />, value: 5, suit: 'CLUB' },
      { card: <Card key={37} image={require('./images/4-C.png')} />, value: 4, suit: 'CLUB' },
      { card: <Card key={38} image={require('./images/3-C.png')} />, value: 3, suit: 'CLUB' },
      { card: <Card key={39} image={require('./images/2-C.png')} />, value: 2, suit: 'CLUB' },
      { card: <Card key={40} image={require('./images/ACE-S.png')} />, value: 14, suit: 'SPADE' },
      { card: <Card key={41} image={require('./images/KING-S.png')} />, value: 13, suit: 'SPADE' },
      { card: <Card key={42} image={require('./images/QUEEN-S.png')} />, value: 12, suit: 'SPADE' },
      { card: <Card key={43} image={require('./images/JACK-S.png')} />, value: 11, suit: 'SPADE' },
      { card: <Card key={44} image={require('./images/10-S.png')} />, value: 10, suit: 'SPADE' },
      { card: <Card key={45} image={require('./images/9-S.png')} />, value: 9, suit: 'SPADE' },
      { card: <Card key={46} image={require('./images/8-S.png')} />, value: 8, suit: 'SPADE' },
      { card: <Card key={47} image={require('./images/7-S.png')} />, value: 7, suit: 'SPADE' },
      { card: <Card key={48} image={require('./images/6-S.png')} />, value: 6, suit: 'SPADE' },
      { card: <Card key={49} image={require('./images/5-S.png')} />, value: 5, suit: 'SPADE' },
      { card: <Card key={50} image={require('./images/4-S.png')} />, value: 4, suit: 'SPADE' },
      { card: <Card key={51} image={require('./images/3-S.png')} />, value: 3, suit: 'SPADE' },
      { card: <Card key={52} image={require('./images/2-S.png')} />, value: 2, suit: 'SPADE' }
    ],
    flop: [],
    bet: 10,
    lastMove: '',
    pot: 0,
    messages: []
  },
  allStoreEnhancers
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
