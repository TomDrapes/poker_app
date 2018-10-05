import React, { Component } from 'react'
import Header from '../components/header/Header'
import Lobby from '../components/lobby/lobby'

export default class LobbyView extends Component {
  render() {
    return(
      <div className="App">
        <Header />
        <Lobby />
      </div>
      )
  }

}
