import React, { Component } from 'react'
import Header from '../components/header/Header'
import Table from '../components/game/Table'
import Chat from '../components/chat/chat'
import '../index.css'

export default class GameView extends Component {
  render (){
    return(
      <div className="App">
        <Header />
        <Table />
        <Chat />
      </div>

    )
  }

}
