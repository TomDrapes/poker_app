import React, { Component } from 'react'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LobbyView from './routes/lobby-view'
import GameView from './routes/game-view'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path={`/`} render={props => <LobbyView {...props} />} />
          <Route path={`/:gameid`} render={props => <GameView {...props}/>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
