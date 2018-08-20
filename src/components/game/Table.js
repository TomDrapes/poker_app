import React, { Component } from 'react'
import Deck from './deck'
import Chat from '../chat/chat'
import { connect } from 'react-redux'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop, resetFlop } from '../../Actions/FlopActions'
import { updatePlayer, updatePlayersTurn, updateChipCount, wonPot } from '../../Actions/PlayersActions'
import { updateBet } from '../../Actions/BetActions'
import { updateLastMove } from '../../Actions/MoveActions'
import { updatePot } from '../../Actions/PotActions'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      betAmount: this.props.currentBet,
    }
    
    this.shuffle(this.props.deck)
  }

  componentDidUpdate(){

    // If player calls then flop next card off deck
    if(this.props.lastMove === 'called'){
      this.flop()
    }else if(this.props.lastMove === 'folded'){
      this.shuffle(this.props.deck)
    }else if(this.props.lastMove === 'shuffled'){
      this.deal()
    }
    

  }

  deal () {
    const p = this.props.players.map(player => { return {...player, hand: []} })
    let deck = this.props.deck
    for(let i = 0 ; i < this.props.players.length; i++){
      for(let j = 0; j < 2; j++){
        p[i].hand.push(deck[0])
        deck.shift()
      }
    }
    this.onUpdateDeck(deck)
    this.onUpdatePlayer(p)
    this.onUpdateLastMove("dealt")
  }

  shuffle (deck) {
    // Return flop cards to deck 
    let d = deck;
    for(let i = 0; i < this.props.flop.length; i++){
      d.push(this.props.flop[i])
    }
    // Return players hands to the deck
    for(let p = 0; p < this.props.players.length; p++){
      for(let h = 0; h < this.props.players[p].hand.length; h++){
        d.push(this.props.players[p].hand[h])
      }
    }
    this.onUpdateDeck(d.sort(function (a, b) { return 0.5 - Math.random() }))
    this.onResetFlop()    
    this.onUpdateLastMove("shuffled")
  }

  flop () {
    let flop = this.props.flop
    let deck = this.props.deck
    flop.push(deck[0])
    console.log(flop)
    deck.shift()
    this.onUpdateDeck(deck)
    this.onUpdateFlop(flop)
    this.onUpdateLastMove('flopped')  
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

  onUpdateLastMove (move) {
    this.props.onUpdateLastMove(move)
  }

  onUpdateChipCount (player, count) {
    this.props.onUpdateChipCount(player, count)
  }

  onUpdatePot (pot) {
    this.props.onUpdatePot(pot)
  }

  onWonPot (player, pot) {
    this.props.onWonPot(player, pot)
  }

  onResetFlop() {
    this.props.onResetFlop()
  }

  playerButtons (player) {
    if(player.playersTurn){        
      return (
        <div>
          {this.checkButton()}
          <button className="foldBtn" onClick ={() => this.fold(player)}>Fold</button>
          <button type="button" className="betBtn" onClick={() => this.bet(player)}>Bet</button>
          {this.betIncrementor(player)}
        </div>
      )
    }      
    return (
      <div>
        <button className="checkBtn" disabled>Check</button>
        <button className="foldBtn" disabled>Fold</button>
        <button type="button" className="betBtn" disabled>Bet</button>
        <div className="betAmountWaiting">{this.props.currentBet}</div>
      </div>
    )
  }

  checkButton = () => {
    if(this.props.lastMove !== 'bet' && this.props.lastMove !== 'raised') {
      return (
        <button className="checkBtn" onClick={() => this.check()}>Check</button>
      )
    }
    return (
      <button className="checkBtn" disabled>Check</button>
    )
  }

  check () {
    if(this.props.lastMove === 'checked'){
      this.flop();
      this.onUpdatePlayersTurn(this.props.players[1])    
      this.onUpdatePlayersTurn(this.props.players[0])
    }else{
      this.onUpdateLastMove('checked')
      this.onUpdatePlayersTurn(this.props.players[1])    
      this.onUpdatePlayersTurn(this.props.players[0])
    }
  }

  increaseBet(player){
    if(player.chipCount - (this.state.betAmount +10) >= 0){
      this.setState({
        betAmount: this.state.betAmount + 10
      })
    }
  }

  decreaseBet(){
    if(this.state.betAmount - 10 >= this.props.currentBet){
      this.setState({
        betAmount: this.state.betAmount - 10
      })
    }
  }

  bet (player) {      
    this.onUpdatePlayersTurn(this.props.players[1])    
    this.onUpdatePlayersTurn(this.props.players[0])

    // No moves made yet so player can only bet
    if( this.props.lastMove !== 'called' && this.props.lastMove !== 'raised'
      && this.props.lastMove !== 'bet'){

      this.onUpdateLastMove('bet')
      this.onUpdateChipCount(player, this.state.betAmount) 
      this.onUpdateBet(this.state.betAmount)
      this.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last Move was a bet/raise and player calling
    }else if(this.state.betAmount === this.props.currentBet && this.props.lastMove === 'bet'
    || this.state.betAmount === this.props.currentBet && this.props.lastMove === 'raised'){

      this.onUpdateLastMove('called')
      this.onUpdateChipCount(player, this.props.currentBet)
      this.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last move was a bet and player is raising
    }else if(this.props.lastMove === 'bet' && this.state.betAmount > this.props.currentBet){
      this.onUpdateBet(this.state.betAmount)
      this.onUpdateLastMove('raised')
      this.onUpdateChipCount(player, this.state.betAmount)
      this.onUpdatePot(this.props.pot + this.state.betAmount)
    }
  }

  fold (player) {
    for(let i = 0; i < this.props.players.length; i++){
      if(this.props.players[i].name !== player.name){
        this.onWonPot(this.props.players[i], this.props.pot)
      }
    }
    this.onUpdateBet(10)
    this.setState({
      betAmount: 10,
    })
    this.onUpdateLastMove('folded')
    this.onUpdatePot(0)
    this.onUpdatePlayersTurn(this.props.players[1])
    this.onUpdatePlayersTurn(this.props.players[0])
  }  

  betIncrementor = (player) => (
    <div className="betAmount">
      <i className="fa fa-caret-up" onClick={() => this.increaseBet(player)} />
      <div>{this.state.betAmount}</div>
      <i className="fa fa-caret-down" onClick={() => this.decreaseBet()} />
    </div>
  )
  
  render () {
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
              <div className="statusMsg">Jerry {this.props.lastMove} {this.props.currentBet}</div>
              <div className="clear" />
              <div className="playerName">John: ${this.props.players[0].chipCount}</div>
              <div className="clear" />
              {this.playerButtons(this.props.players[0])}
            </div>
            <div>Pot:{this.props.pot} CurrentBet:{this.props.currentBet}</div>
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
    currentBet: state.bet,
    lastMove: state.lastMove,
    pot: state.pot
  }
};

const mapActionsToProps = {
  onUpdateDeck: updateDeck,
  onUpdateFlop: updateFlop,
  onUpdatePlayer: updatePlayer,
  onUpdatePlayersTurn: updatePlayersTurn,
  onUpdateBet: updateBet,
  onUpdateLastMove: updateLastMove,
  onUpdateChipCount: updateChipCount,
  onUpdatePot: updatePot,
  onWonPot: wonPot,
  onResetFlop: resetFlop,
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
