import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './Reducers/ProductsReducer'
import userReducer from './Reducers/UserReducer'
import deckReducer from './Reducers/DeckReducer'
import thunk from 'redux-thunk'

import Card from './components/game/card'

const allReducers = combineReducers({
  products: productsReducer,
  user: userReducer,
  deck: deckReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk), // has to come first or won't work
  window.devToolsExtension && window.devToolsExtension()
)
const store = createStore(
  allReducers,
  {
    products: [{ name: 'iphone' }],
    user: 'Tom',
    deck: [
      { card: <Card image={require('./images/ACE-H.png')} />, value: 14 },
      { card: <Card image={require('./images/KING-H.png')} />, value: 13 },
      { card: <Card image={require('./images/QUEEN-H.png')} />, value: 12 },
      { card: <Card image={require('./images/JACK-H.png')} />, value: 11 },
      { card: <Card image={require('./images/10-H.png')} />, value: 10 },
      { card: <Card image={require('./images/9-H.png')} />, value: 9 },
      { card: <Card image={require('./images/8-H.png')} />, value: 8 },
      { card: <Card image={require('./images/7-H.png')} />, value: 7 },
      { card: <Card image={require('./images/6-H.png')} />, value: 6 },
      { card: <Card image={require('./images/5-H.png')} />, value: 5 },
      { card: <Card image={require('./images/4-H.png')} />, value: 4 },
      { card: <Card image={require('./images/3-H.png')} />, value: 3 },
      { card: <Card image={require('./images/2-H.png')} />, value: 2 },
      { card: <Card image={require('./images/ACE-D.png')} />, value: 14 },
      { card: <Card image={require('./images/KING-D.png')} />, value: 13 },
      { card: <Card image={require('./images/QUEEN-D.png')} />, value: 12 },
      { card: <Card image={require('./images/JACK-D.png')} />, value: 11 },
      { card: <Card image={require('./images/10-D.png')} />, value: 10 },
      { card: <Card image={require('./images/9-D.png')} />, value: 9 },
      { card: <Card image={require('./images/8-D.png')} />, value: 8 },
      { card: <Card image={require('./images/7-D.png')} />, value: 7 },
      { card: <Card image={require('./images/6-D.png')} />, value: 6 },
      { card: <Card image={require('./images/5-D.png')} />, value: 5 },
      { card: <Card image={require('./images/4-D.png')} />, value: 4 },
      { card: <Card image={require('./images/3-D.png')} />, value: 3 },
      { card: <Card image={require('./images/2-D.png')} />, value: 2 },
      { card: <Card image={require('./images/ACE-C.png')} />, value: 14 },
      { card: <Card image={require('./images/KING-C.png')} />, value: 13 },
      { card: <Card image={require('./images/QUEEN-C.png')} />, value: 12 },
      { card: <Card image={require('./images/JACK-C.png')} />, value: 11 },
      { card: <Card image={require('./images/10-C.png')} />, value: 10 },
      { card: <Card image={require('./images/9-C.png')} />, value: 9 },
      { card: <Card image={require('./images/8-C.png')} />, value: 8 },
      { card: <Card image={require('./images/7-C.png')} />, value: 7 },
      { card: <Card image={require('./images/6-C.png')} />, value: 6 },
      { card: <Card image={require('./images/5-C.png')} />, value: 5 },
      { card: <Card image={require('./images/4-C.png')} />, value: 4 },
      { card: <Card image={require('./images/3-C.png')} />, value: 3 },
      { card: <Card image={require('./images/2-C.png')} />, value: 2 },
      { card: <Card image={require('./images/ACE-S.png')} />, value: 14 },
      { card: <Card image={require('./images/KING-S.png')} />, value: 13 },
      { card: <Card image={require('./images/QUEEN-S.png')} />, value: 12 },
      { card: <Card image={require('./images/JACK-S.png')} />, value: 11 },
      { card: <Card image={require('./images/10-S.png')} />, value: 10 },
      { card: <Card image={require('./images/9-S.png')} />, value: 9 },
      { card: <Card image={require('./images/8-S.png')} />, value: 8 },
      { card: <Card image={require('./images/7-S.png')} />, value: 7 },
      { card: <Card image={require('./images/6-S.png')} />, value: 6 },
      { card: <Card image={require('./images/5-S.png')} />, value: 5 },
      { card: <Card image={require('./images/4-S.png')} />, value: 4 },
      { card: <Card image={require('./images/3-S.png')} />, value: 3 },
      { card: <Card image={require('./images/2-S.png')} />, value: 2 }
    ]
  },
  allStoreEnhancers
)

ReactDOM.render(<Provider store={store}><App randomProps="whatever" /></Provider>, document.getElementById('root'))
registerServiceWorker()
