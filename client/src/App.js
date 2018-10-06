import React, { Component } from 'react'
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LobbyView from './routes/lobby-view'
import GameView from './routes/game-view'
import StatsView from './routes/stats-view'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path={`/`} render={props => <LobbyView {...props} />} />
          <Route path={`/game/:gameid`} render={props => <GameView {...props}/>} />
          <Route path={`/stats`} render={props => <StatsView data={[5, 10, 1, 3]} size={[500, 500]} {...props}/>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
