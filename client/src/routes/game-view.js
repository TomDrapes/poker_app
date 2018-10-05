import React, { Component } from 'react'
import Header from '../components/header/Header'
import Table from '../components/game/Table'
import Chat from '../components/chat/chat'
import '../index.css'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:9000')

export default class GameView extends Component {
  render (){
    return(
      <div className="App">
        <Header />
        <Table socket={socket}/>
        <Chat socket={socket}/>
      </div>

    )
  }

}
