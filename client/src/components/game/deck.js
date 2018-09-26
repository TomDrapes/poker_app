
import React, { Component } from 'react'
import './style.css'

export default class Deck extends Component {
  render () {
    return (
      <div className="deck">
        <img src={require('../../images/cards/back.png')} alt="deck" width='100' height='140'/>
      </div>
    )
  }
}
