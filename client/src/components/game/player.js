import React, { Component } from 'react'

export default class Player extends Component {

  /* JSX to enable players buttons if it's their turn */
  playerButtons () {
    if(this.props.player){
      if (this.props.player.playersTurn) {
        return (
          <div>
            {this.checkButton()}
            <button className="foldBtn" onClick ={() => this.props.fold(this.props.player)}>FOLD</button>
            <button type="button" className="betBtn" onClick={() => this.props.bet(this.props.player)}>BET</button>
            {this.betIncrementor(this.props.player, this.props.betAmount)}
          </div>
        )
      }
    }
    return (
      <div>
        <button className="checkBtn" disabled>CHECK</button>
        <button className="foldBtn" disabled>FOLD</button>
        <button type="button" className="betBtn" disabled>BET</button>
        <div className="betAmountWaiting">{this.props.currentBet}</div>
      </div>
    )
  }

  /* Only enable check button if opponents move wasn't bet/raised */
  checkButton = () => {
    if (this.props.lastMove !== 'bet' && this.props.lastMove !== 'raised') {
      return (
        <button className="checkBtn" onClick={() => this.props.check()}>CHECK</button>
      )
    }
    return (
      <button className="checkBtn" disabled>CHECK</button>
    )
  }

  // Bet incrementor component
  betIncrementor = (player, betAmount) => (
    <div className="betAmount">
      <i className="fa fa-caret-up" onClick={() => this.props.increaseBet(player)} />
      <div>{betAmount}</div>
      <i className="fa fa-caret-down" onClick={() => this.props.decreaseBet()} />
    </div>
  )

  hand() {
    if (this.props.player){
      return this.props.player.hand.map(key => this.props.deck[key-1].card)
    }
    return null
  }

  render() {
    return (
      <div className="playerSide">
        {this.hand()}
        <div className="btnWrapper">
          <div className="playerName">{this.props.player.name}</div>
          <div className="clear" />
          <div className="chipCount">
            <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip"/>
            {this.props.player.chipCount}
          </div>
          <div className="clear" />
            {this.playerButtons()}
        </div>
        <div className="clear" />
      </div>
    )
  }
}
