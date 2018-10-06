import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import localStateReducer from './Reducers/LocalStateReducer'
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
  localState: localStateReducer,
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
    localState: {
      gameId: "",
      playerId: 0,
      deck: [
        { card: <Card key={1} image={require('./images/cards/ACE-H.png')} />, value: 14, suit: 'HEARTS', key: 1 },
        { card: <Card key={2} image={require('./images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
        { card: <Card key={3} image={require('./images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
        { card: <Card key={4} image={require('./images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
        { card: <Card key={5} image={require('./images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
        { card: <Card key={6} image={require('./images/cards/9-H.png')} />, value: 9, suit: 'HEARTS', key: 6 },
        { card: <Card key={7} image={require('./images/cards/8-H.png')} />, value: 8, suit: 'HEARTS', key: 7 },
        { card: <Card key={8} image={require('./images/cards/7-H.png')} />, value: 7, suit: 'HEARTS', key: 8 },
        { card: <Card key={9} image={require('./images/cards/6-H.png')} />, value: 6, suit: 'HEARTS', key: 9 },
        { card: <Card key={10} image={require('./images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
        { card: <Card key={11} image={require('./images/cards/4-H.png')} />, value: 4, suit: 'HEARTS', key: 11 },
        { card: <Card key={12} image={require('./images/cards/3-H.png')} />, value: 3, suit: 'HEARTS', key: 12 },
        { card: <Card key={13} image={require('./images/cards/2-H.png')} />, value: 2, suit: 'HEARTS', key: 13 },
        { card: <Card key={14} image={require('./images/cards/ACE-D.png')} />, value: 14, suit: 'DIAMONDS', key: 14 },
        { card: <Card key={15} image={require('./images/cards/KING-D.png')} />, value: 13, suit: 'DIAMONDS', key: 15 },
        { card: <Card key={16} image={require('./images/cards/QUEEN-D.png')} />, value: 12, suit: 'DIAMONDS', key: 16 },
        { card: <Card key={17} image={require('./images/cards/JACK-D.png')} />, value: 11, suit: 'DIAMONDS', key: 17 },
        { card: <Card key={18} image={require('./images/cards/10-D.png')} />, value: 10, suit: 'DIAMONDS', key: 18},
        { card: <Card key={19} image={require('./images/cards/9-D.png')} />, value: 9, suit: 'DIAMONDS', key: 19 },
        { card: <Card key={20} image={require('./images/cards/8-D.png')} />, value: 8, suit: 'DIAMONDS', key: 20 },
        { card: <Card key={21} image={require('./images/cards/7-D.png')} />, value: 7, suit: 'DIAMONDS', key: 21 },
        { card: <Card key={22} image={require('./images/cards/6-D.png')} />, value: 6, suit: 'DIAMONDS', key: 22 },
        { card: <Card key={23} image={require('./images/cards/5-D.png')} />, value: 5, suit: 'DIAMONDS', key: 23 },
        { card: <Card key={24} image={require('./images/cards/4-D.png')} />, value: 4, suit: 'DIAMONDS', key: 24 },
        { card: <Card key={25} image={require('./images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
        { card: <Card key={26} image={require('./images/cards/2-D.png')} />, value: 2, suit: 'DIAMONDS', key: 26 },
        { card: <Card key={27} image={require('./images/cards/ACE-C.png')} />, value: 14, suit: 'CLUBS', key: 27 },
        { card: <Card key={28} image={require('./images/cards/KING-C.png')} />, value: 13, suit: 'CLUBS', key: 28 },
        { card: <Card key={29} image={require('./images/cards/QUEEN-C.png')} />, value: 12, suit: 'CLUBS', key: 29 },
        { card: <Card key={30} image={require('./images/cards/JACK-C.png')} />, value: 11, suit: 'CLUBS', key: 30 },
        { card: <Card key={31} image={require('./images/cards/10-C.png')} />, value: 10, suit: 'CLUBS', key: 31 },
        { card: <Card key={32} image={require('./images/cards/9-C.png')} />, value: 9, suit: 'CLUBS', key: 32 },
        { card: <Card key={33} image={require('./images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
        { card: <Card key={34} image={require('./images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 },
        { card: <Card key={35} image={require('./images/cards/6-C.png')} />, value: 6, suit: 'CLUBS', key: 35 },
        { card: <Card key={36} image={require('./images/cards/5-C.png')} />, value: 5, suit: 'CLUBS', key: 36 },
        { card: <Card key={37} image={require('./images/cards/4-C.png')} />, value: 4, suit: 'CLUBS', key: 37 },
        { card: <Card key={38} image={require('./images/cards/3-C.png')} />, value: 3, suit: 'CLUBS', key: 38 },
        { card: <Card key={39} image={require('./images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
        { card: <Card key={40} image={require('./images/cards/ACE-S.png')} />, value: 14, suit: 'SPADES', key: 40 },
        { card: <Card key={41} image={require('./images/cards/KING-S.png')} />, value: 13, suit: 'SPADES', key: 41 },
        { card: <Card key={42} image={require('./images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 },
        { card: <Card key={43} image={require('./images/cards/JACK-S.png')} />, value: 11, suit: 'SPADES', key: 43 },
        { card: <Card key={44} image={require('./images/cards/10-S.png')} />, value: 10, suit: 'SPADES', key: 44 },
        { card: <Card key={45} image={require('./images/cards/9-S.png')} />, value: 9, suit: 'SPADES', key: 45 },
        { card: <Card key={46} image={require('./images/cards/8-S.png')} />, value: 8, suit: 'SPADES', key: 46 },
        { card: <Card key={47} image={require('./images/cards/7-S.png')} />, value: 7, suit: 'SPADES', key: 47 },
        { card: <Card key={48} image={require('./images/cards/6-S.png')} />, value: 6, suit: 'SPADES', key: 48 },
        { card: <Card key={49} image={require('./images/cards/5-S.png')} />, value: 5, suit: 'SPADES', key: 49 },
        { card: <Card key={50} image={require('./images/cards/4-S.png')} />, value: 4, suit: 'SPADES', key: 50 },
        { card: <Card key={51} image={require('./images/cards/3-S.png')} />, value: 3, suit: 'SPADES', key: 51 },
        { card: <Card key={52} image={require('./images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 }
      ]
    },
    players: [],
    deck: [],
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
