import React, { Component } from 'react'
import Card from './card'
import Deck from './deck'
import Chat from '../chat/chat'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop } from '../../Actions/FlopActions'
import { updatePlayer, updatePlayersTurn } from '../../Actions/PlayersActions'
import { updateBet } from '../../Actions/BetActions'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      betAmount: 50,
    }

    this.onUpdateDeck = this.onUpdateDeck.bind(this)
    this.onUpdateFlop = this.onUpdateFlop.bind(this)
    this.onUpdatePlayer = this.onUpdatePlayer.bind(this)
    this.onUpdatePlayersTurn = this.onUpdatePlayersTurn.bind(this)

    //this.shuffle(this.state.deck)
    this.shuffle(this.props.deck)
    this.deal()
  }

  deal () {
    let p = this.props.players
    let deck = this.props.deck
    for(let i = 0 ; i < this.props.players.length; i++){
      for(let j = 0; j < 2; j++){
        p[i].hand.push(deck[0])
        deck.shift()
      }
    }
    this.onUpdateDeck(deck)
    this.onUpdatePlayer(p)
  }

  shuffle (deck) {
    this.onUpdateDeck(deck.sort(function (a, b) { return 0.5 - Math.random() }))
  }

  flop () {
    let flop = this.props.flop
    let deck = this.props.deck
    flop.push(deck[0])
    deck.shift()
    this.onUpdateDeck(deck)
    this.onUpdateFlop(flop)    
  }

  playersHand (player) {
    if(player.hand.length === 2 ){
      return player.hand.map(x => x.card)
    }    
    return null
  }

  onUpdateDeck (deck) {
    this.props.onUpdateDeck(deck)
  }

  onUpdateFlop (flop) {
    this.props.onUpdateFlop(flop)
  }

  onUpdatePlayer (players) {
    this.props.onUpdatePlayer(players)
  } 

  onUpdatePlayersTurn (player) {
    this.props.onUpdatePlayersTurn(player)
  }

  onUpdateBet (bet) {
    this.props.onUpdateBet(bet)
  }

  playerButtons (player) {
    if(player.playersTurn){        
      return (
        <div>
          <button className="checkBtn" onClick={() => this.increaseBet()}>Check</button>
          <button className="foldBtn" onClick ={() => this.flop()}>Fold</button>
          <button type="button" className="betBtn" onClick={() => this.bet()}>Bet</button>
          <button className="betAmount">$50</button>
        </div>
      )
    }      
    return (
      <div>
        <button className="checkBtn" disabled>Check</button>
        <button className="foldBtn" disabled>Fold</button>
        <button type="button" className="betBtn" disabled>Bet</button>
        <button className="betAmount">$50</button>
      </div>
    )
  }

  check () {
  }

  increaseBet(){
    this.setState({
      betAmount: this.state.betAmount *2
    })
  }

  bet () {      
    this.onUpdatePlayersTurn(this.props.players[1])    
    this.onUpdatePlayersTurn(this.props.players[0])

    this.onUpdateBet(this.state.betAmount)
    
    /*this.setState({
      currentBet: this.state.currentBet + this.state.betAmount,      
    })*/
  }

  fold () {}
  mainGameLoop () {
    //this.updateState()
    console.log("render: ", this.props.bet)
  }
  render () {
    this.mainGameLoop()
    return (
      <div className="table">
        <div className="gameWindow">
          <div className="oppSide">
            {this.playerButtons(this.props.players[1])}
            <div className="oppName">Jerry: ${this.props.players[1].chipCount}</div>
            {this.playersHand(this.props.players[1])}
            <div className="clear" />
          </div>
          <div className="flopWrapper">
            <div className="flop">
              <Deck />
              {this.props.flop.map(x => x.card)}
              <div className="clear" />
            </div>
          </div>
          <div className="playerSide">
            {this.playersHand(this.props.players[0])}
            <div className="btnWrapper">
              <div className="statusMsg">Waiting for Jerry...</div>
              <div className="clear" />
              <div className="playerName">John: ${this.props.players[0].chipCount}</div>
              <div className="clear" />
              {this.playerButtons(this.props.players[0])}
            </div>
            <div>Pot:{this.props.pot} CurrentBet:{this.props.bet}</div>
            <div className="clear" />
          </div>
        </div>
        <div className="chatWindow">
          <Chat />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {  
    players: state.players,  
    deck: state.deck,
    flop: state.flop,
    bet: state.bet
  }
};

const mapActionsToProps = {
  onUpdateDeck: updateDeck,
  onUpdateFlop: updateFlop,
  onUpdatePlayer: updatePlayer,
  onUpdatePlayersTurn: updatePlayersTurn,
  onUpdateBet: updateBet,
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
