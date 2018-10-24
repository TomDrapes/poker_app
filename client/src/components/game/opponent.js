import React, { Component } from 'react'

export default class Opponent extends Component {

  name = () => {
    if (this.props.player){
      return this.props.player.name
    }
    return ''
  }

  chipCount = () => {
    if (this.props.player){
      return this.props.player.chipCount
    }
  }

hand = () => {
    if (this.props.player) {
      return this.props.hand
    }
  }

  render(){
    return(
      <div className="oppSide">
        <div className="oppName">
          <div>{this.name()}</div>
          <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip" />
          {this.chipCount()}
        </div>
        {this.hand()}
        <div className="clear" />
      </div>
    )
  }
}
