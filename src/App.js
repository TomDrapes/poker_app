import React, { Component } from 'react'
import './index.css'
import Header from './components/header/Header'
import Table from './components/game/Table'

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <Table />
      </div>
    )
  }
}
