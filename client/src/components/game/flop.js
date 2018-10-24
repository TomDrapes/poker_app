import React, { Component } from 'react'
import Deck from './deck'

export default class Flop extends Component {

  render(){
    return (
    <div className="flopWrapper">
      <div className="flop">
        <Deck />
        {this.props.flop}
        <div className="clear" />
      </div>
    </div>
    )
  }
}
