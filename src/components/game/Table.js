import React, { Component } from 'react'
import Deck from './deck'
import Chat from '../chat/chat'
import Card from './card'
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

    if(this.props.lastMove === 'both_checked' && this.props.flop.length === 5 ||
      this.props.lastMove === 'called' && this.props.flop.length === 5){
        console.log(this.determineBestHand(this.props.players[1]))
        console.log(this.determineBestHand(this.props.players[0]))
        
    } else if(this.props.lastMove === 'called'){
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
    this.props.onUpdateDeck(deck)
    this.props.onUpdatePlayer(p)
    this.props.onUpdateLastMove("dealt")
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
    this.props.onUpdateDeck(d.sort(function (a, b) { return 0.5 - Math.random() }))
    this.props.onResetFlop()    
    this.props.onUpdateLastMove("shuffled")
  }

  flop () {
    let flop = this.props.flop
    let deck = this.props.deck
    flop.push(deck[0])
    deck.shift()
    this.props.onUpdateDeck(deck)
    this.props.onUpdateFlop(flop)
    this.props.onUpdateLastMove('flopped')    
  }

  playersHand (player) {
    if(player.hand.length === 2 ){
      return player.hand.map(x => x.card)
    }    
    return null
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
      this.props.onUpdatePlayersTurn(this.props.players[1])    
      this.props.onUpdatePlayersTurn(this.props.players[0])
      this.props.onUpdateLastMove('both_checked')
    }else{
      this.props.onUpdateLastMove('checked')
      this.props.onUpdatePlayersTurn(this.props.players[1])    
      this.props.onUpdatePlayersTurn(this.props.players[0])
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
    this.props.onUpdatePlayersTurn(this.props.players[1])    
    this.props.onUpdatePlayersTurn(this.props.players[0])

    // No moves made yet so player can only bet
    if( this.props.lastMove !== 'called' && this.props.lastMove !== 'raised'
      && this.props.lastMove !== 'bet'){

      this.props.onUpdateLastMove('bet')
      this.props.onUpdateChipCount(player, this.state.betAmount) 
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last Move was a bet/raise and player calling
    }else if(this.state.betAmount === this.props.currentBet && this.props.lastMove === 'bet'
    || this.state.betAmount === this.props.currentBet && this.props.lastMove === 'raised'){

      this.props.onUpdateLastMove('called')
      this.props.onUpdateChipCount(player, this.props.currentBet)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last move was a bet and player is raising
    }else if(this.props.lastMove === 'bet' && this.state.betAmount > this.props.currentBet){
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdateLastMove('raised')
      this.props.onUpdateChipCount(player, this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
    }
  }

  fold (player) {
    for(let i = 0; i < this.props.players.length; i++){
      if(this.props.players[i].name !== player.name){
        this.props.onWonPot(this.props.players[i], this.props.pot)
      }
    }
    this.props.onUpdateBet(10)
    this.setState({
      betAmount: 10,
    })
    this.props.onUpdateLastMove('folded')
    this.props.onUpdatePot(0)
    this.props.onUpdatePlayersTurn(this.props.players[1])
    this.props.onUpdatePlayersTurn(this.props.players[0])
  }  

  betIncrementor = (player) => (
    <div className="betAmount">
      <i className="fa fa-caret-up" onClick={() => this.increaseBet(player)} />
      <div>{this.state.betAmount}</div>
      <i className="fa fa-caret-down" onClick={() => this.decreaseBet()} />
    </div>
  )

  isFlush(hand){
    let hearts = 0, diamonds = 0, spades = 0, clubs = 0
    for(let i = 0; i < hand.length; i++){
      switch(hand[i].suit){
        case 'HEART': hearts++
          break
        case 'DIAMOND': diamonds++
          break
        case 'CLUB': clubs++
          break
        case 'SPADE': spades++
          break
        default: break
      }
    }

    if(hearts >= 5){
      return 'HEART'
    }else if(diamonds >= 5){
      return 'DIAMOND'
    }else if(spades >= 5){
      return 'SPADE'
    }else if(clubs >= 5){
      return 'CLUB'
    }else{
      return 'NO_FLUSH'
    } 
  }

  isRoyalFlush(hand, suit){
    let ace = false, king = false, queen = false, jack = false, ten = false
    for (let i = 0; i < hand.length; i++){
      if(hand[i].value === 14 && hand[i].suit === suit){
        ace = true
      }else if(hand[i].value === 13 && hand[i].suit ===suit){
        king = true
      }else if(hand[i].value === 12 && hand[i].suit === suit){
        queen = true
      }else if(hand[i].value === 11 && hand[i].suit === suit){
        jack = true
      }else if(hand[i].value === 10 && hand[i].suit === suit){
        ten = true
      } 
    }
    if(ace && king && queen && jack && ten){
      return true
    }
    return false
  }

  isStraightFlush(h, suit){
    let hand = JSON.parse(JSON.stringify(h))
    // Add ace with value 1 to check for other possible straights
    for(let i = 0; i < hand.length; i++){
      if(hand[i].value === 14){
        hand.push({ card: <Card key={14} image={require('../../images/ACE-D.png')} />, value: 1, suit: suit })
      }
    }

    // Remove any duplicates which interfere with checking for straights
    let ofAKinds = this.isOfAKind(hand)
    for(let x = 0; x < ofAKinds.count-1; x++){
      for(let y = 0; y < hand.length; y++){
        if(hand[y].value === ofAKinds.value &&
          hand[y].suit !== suit){
          hand.splice(y, 1)
        }
      }
    }

    for(let j = 0; j < hand.length-4; j++){
      if(hand[j+1].value === hand[j].value + 1 && 
        hand[j+2].value === hand[j].value + 2 &&
        hand[j+3].value === hand[j].value + 3 &&
        hand[j+4].value === hand[j].value + 4 &&
        hand[j].suit === suit && hand[j+1].suit === suit &&
        hand[j+2].suit === suit && hand[j+3].suit === suit &&
        hand[j+4].suit === suit){
          return true
        }
    }
    return false
  }

  isOfAKind(hand){
    console.log("hand: ", hand)
    let count = 1
    let value = 0
    for(let i = 0; i < hand.length; i++){
      let tempCount = 1
      for(let j = i+1; j < hand.length; j++){
        if(hand[i].value === hand[j].value){
          //console.log("tempCount: " + tempCount)
          tempCount++
        }
      }
      if(tempCount >= 2 && tempCount > count){
        count = tempCount
        value = hand[i].value
      }
    }
    //console.log(count)
    return {count, value}
  }

  isFullHouse(h){
    let hand = JSON.parse(JSON.stringify(h))
    let threeOfAKind = false
    let pair = false
    for(let i = 0; i < hand.length-2; i++){
      if(hand[i].value === hand[i+1].value &&
        hand[i].value === hand[i+2].value){
          threeOfAKind = true
          hand.splice(i, 3)
        }
    }

    for(let j = 0; j < hand.length-1; j++){
      if(hand[j].value === hand[j+1].value){
        pair = true
      }
    }
    if(threeOfAKind && pair){
      return true
    }
    return false
  }

  isStraight(h){
    let hand = JSON.parse(JSON.stringify(h))
    // Add ace with value 1 to check for other possible straights
    for(let i = 0; i < hand.length; i++){
      if(hand[i].value === 14){
        hand.push({ card: <Card key={14} image={require('../../images/ACE-D.png')} />, value: 1, suit: hand[i].suit })
      }
    }
    // Remove any duplicates which interfere with checking for straights
    let ofAKinds = this.isOfAKind(hand)
    for(let x = 0; x < ofAKinds.count-1; x++){
      for(let y = 0; y < hand.length; y++){
        if(hand[y].value === ofAKinds.value){
          hand.splice(y, 1)
        }
      }
    }

    for(let j = 0; j < hand.length-4; j++){
      if(hand[j+1].value === hand[j].value + 1 && 
        hand[j+2].value === hand[j].value + 2 &&
        hand[j+3].value === hand[j].value + 3 &&
        hand[j+4].value === hand[j].value + 4 ){
          return true
        }
    }
    return false
  }

  isTwoPair(h){
    let hand = JSON.parse(JSON.stringify(h)) 
    let pairs = 0
    for(let i = 0; i < hand.length-1; i++){
      if(hand[i].value === hand[i+1].value){
          pairs++
          hand.splice(i, 2)
        }
    }

    for(let j = 0; j < hand.length-1; j++){
      if(hand[j].value === hand[j+1].value){
        pairs++
      }
    }
    if(pairs === 2){
      return true
    }
    return false
  }

  determineBestHand (player) {
    const cards = player.hand.concat(this.props.flop).sort(function(a, b){
      return a.value - b.value
    })

    
    console.log("c", cards)
    const flush = this.isFlush(cards)
    const ofAkind = this.isOfAKind(cards)

    if(flush !== 'NO_FLUSH'){      
      if(this.isRoyalFlush(cards, flush)){
        return 'royal_flush_'+flush
      }else if(this.isStraightFlush(cards, flush)){
        return 'straight_flush_'+flush
      }
    }

    if(ofAkind.count === 4){
      return 'four_of_a_kind_'+ofAkind.value
    }

    if(this.isFullHouse(cards)){
      return 'full_house'
    }

    
    if(flush !== 'NO_FLUSH'){
      return 'flush_'+flush
    }
    
    if(this.isStraight(cards)){
      return 'straight'
    }

    if(ofAkind.count === 3){
      return 'three_of_a_kind_'+ ofAkind.value
    }

    if(this.isTwoPair(cards)){
      return 'two_pair'
    }

    if(ofAkind.count === 2){
      return 'pair_'+ ofAkind.value
    }

    const hand = player.hand.sort(function(a, b){
      return a.value - b.value
    })
    return 'high_card_' + hand[1].value + '_' + hand[1].suit

  }
  
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
