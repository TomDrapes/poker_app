import React, { Component } from 'react'
import Card from './card'

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
      if (this.props.showHand){
        return this.props.player.hand.map(key => this.props.deck[key-1].card)
      }else{
        return ([
            <Card image={require('../../images/cards/back.png')} key={0}/>,
            <Card image={require('../../images/cards/back.png')} key={1}/>,
          ])
      }
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
