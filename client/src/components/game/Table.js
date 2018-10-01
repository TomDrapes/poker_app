
import React, { Component } from 'react'
import Deck from './deck'
import axios from 'axios'
import Card from './card'
import { connect } from 'react-redux'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop, resetFlop } from '../../Actions/FlopActions'
import { updatePlayer, updatePlayersTurn, updateChipCount, wonPot } from '../../Actions/PlayersActions'
import { updateBet } from '../../Actions/BetActions'
import { updateLastMove } from '../../Actions/MoveActions'
import { updatePot } from '../../Actions/PotActions'
import { isFlush, isRoyalFlush, isStraightFlush,
  isOfAKind, isFullHouse, isStraight, isTwoPair} from './handAlgorithms'
import uuid from 'uuid'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      betAmount: this.props.currentBet
    }

    this.shuffle(this.props.deck)
  }

  componentWillMount(){
    /*let gamestate = {
      _id: uuid(),
      players: this.props.players,
    }
    axios.put(`/api/gamestate/`, gamestate)
      .then(res => console.log(res));*/
  }
  /* When component updates check what the last move was and handle accordingly */
  componentDidUpdate () {
    if ((this.props.lastMove === 'both_checked' && this.props.flop.length === 5) ||
      (this.props.lastMove === 'called' && this.props.flop.length === 5)) {
      console.log(this.determineBestHand(this.props.players[1]))
      console.log(this.determineBestHand(this.props.players[0]))
    } else if (this.props.lastMove === 'called') {
      this.flop()
    } else if (this.props.lastMove === 'folded') {
      this.shuffle(this.props.deck)
    } else if (this.props.lastMove === 'shuffled') {
      this.deal()
    }

  }

  /* Deal two cards to each player then update state in store */
  deal () {
    const p = this.props.players.map(player => { return {...player, hand: []} })
    let deck = this.props.deck
    for (let i = 0; i < this.props.players.length; i++) {
      for (let j = 0; j < 2; j++) {
        p[i].hand.push(deck[0])
        deck.shift()
      }
    }
    this.props.onUpdateDeck(deck)
    this.props.onUpdatePlayer(p)
    this.props.onUpdateLastMove('dealt')
  }

  shuffle (deck) {
    // Return flop cards to deck
    let d = deck
    for (let i = 0; i < this.props.flop.length; i++) {
      d.push(this.props.flop[i])
    }
    // Return players hands to the deck
    for (let p = 0; p < this.props.players.length; p++) {
      for (let h = 0; h < this.props.players[p].hand.length; h++) {
        d.push(this.props.players[p].hand[h])
      }
    }
    /* Update state in store */
    this.props.onUpdateDeck(d.sort(function (a, b) { return 0.5 - Math.random() }))
    this.props.onResetFlop()
    this.props.onUpdateLastMove('shuffled')
  }

  /* Flop top card off the deck and then update state in store */
  flop () {
    let flop = this.props.flop
    let deck = this.props.deck
    flop.push(deck[0])
    deck.shift()
    this.props.onUpdateDeck(deck)
    this.props.onUpdateFlop(flop)
    this.props.onUpdateLastMove('flopped')
  }

  /* Returns array of the players cards to be displayed */
  playersHand (player) {
    if (player.hand.length === 2) {
      return player.hand.map(x => x.card)
    }
    return null
  }

  /* JSX to enable players buttons if it's their turn */
  playerButtons (player) {
    if (player.playersTurn) {
      return (
        <div>
          {this.checkButton()}
          <button className="foldBtn" onClick ={() => this.fold(player)}>FOLD</button>
          <button type="button" className="betBtn" onClick={() => this.bet(player)}>BET</button>
          {this.betIncrementor(player)}
        </div>
      )
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
        <button className="checkBtn" onClick={() => this.check()}>CHECK</button>
      )
    }
    return (
      <button className="checkBtn" disabled>CHECK</button>
    )
  }

  /* Make check move and update state in store */
  check () {
    if (this.props.lastMove === 'checked') {
      this.flop()
      this.props.onUpdatePlayersTurn(this.props.players[1])
      this.props.onUpdatePlayersTurn(this.props.players[0])
      this.props.onUpdateLastMove('both_checked')
    } else {
      this.props.onUpdateLastMove('checked')
      this.props.onUpdatePlayersTurn(this.props.players[1])
      this.props.onUpdatePlayersTurn(this.props.players[0])
    }
  }

  /* Increment bet amount and update local state */
  increaseBet (player) {
    if (player.chipCount - (this.state.betAmount + 10) >= 0) {
      this.setState({
        betAmount: this.state.betAmount + 10
      })
    }
  }

  /* Decrement bet amount and update local state */
  decreaseBet () {
    if (this.state.betAmount - 10 >= this.props.currentBet) {
      this.setState({
        betAmount: this.state.betAmount - 10
      })
    }
  }

  /* Makes a bet move */
  bet (player) {
    this.props.onUpdatePlayersTurn(this.props.players[1])
    this.props.onUpdatePlayersTurn(this.props.players[0])

    // No moves made yet so player can only bet
    if (this.props.lastMove !== 'called' && this.props.lastMove !== 'raised' &&
      this.props.lastMove !== 'bet') {
      this.props.onUpdateLastMove('bet')
      this.props.onUpdateChipCount(player, this.state.betAmount)
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last Move was a bet/raise and player calling
    } else if ((this.state.betAmount === this.props.currentBet && this.props.lastMove === 'bet') ||
    (this.state.betAmount === this.props.currentBet && this.props.lastMove === 'raised')) {
      this.props.onUpdateLastMove('called')
      this.props.onUpdateChipCount(player, this.props.currentBet)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)

    // Last move was a bet and player is raising
    } else if (this.props.lastMove === 'bet' && this.state.betAmount > this.props.currentBet) {
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdateLastMove('raised')
      this.props.onUpdateChipCount(player, this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
    }
  }

  /* Player folds */
  fold (player) {
    for (let i = 0; i < this.props.players.length; i++) {
      // Opponent wins the pot
      if (this.props.players[i].name !== player.name) {
        this.props.onWonPot(this.props.players[i], this.props.pot)
      }
    }
    // Revert bet amount back to start state locally and in store */
    this.props.onUpdateBet(10)
    this.setState({
      betAmount: 10
    })
    // Update state in store
    this.props.onUpdateLastMove('folded')
    this.props.onUpdatePot(0)
    this.props.onUpdatePlayersTurn(this.props.players[1])
    this.props.onUpdatePlayersTurn(this.props.players[0])
  }

  // Bet incrementor component
  betIncrementor = (player) => (
    <div className="betAmount">
      <i className="fa fa-caret-up" onClick={() => this.increaseBet(player)} />
      <div>{this.state.betAmount}</div>
      <i className="fa fa-caret-down" onClick={() => this.decreaseBet()} />
    </div>
  )

  /* Checks players hand against the flopped cards to determine what
   the best hand the player can make and returns it as a string.
   TODO: change this to return { type: string, value: number }
*/
determineBestHand (player) {
  const cards = player.hand.concat(this.props.flop).sort(function (a, b) {
    return a.value - b.value
  })

  const flush = isFlush(cards)
  const ofAkind = isOfAKind(cards)

  if (flush !== 'NO_FLUSH') {
    if (isRoyalFlush(cards, flush)) {
      return 'royal_flush_' + flush
    } else if (isStraightFlush(cards, flush)) {
      return 'straight_flush_' + flush
    }
  }

  if (ofAkind.count === 4) {
    return 'four_of_a_kind_' + ofAkind.value
  }

  if (isFullHouse(cards)) {
    return 'full_house'
  }

  if (flush !== 'NO_FLUSH') {
    return 'flush_' + flush
  }

  if (isStraight(cards)) {
    return 'straight'
  }

  if (ofAkind.count === 3) {
    return 'three_of_a_kind_' + ofAkind.value
  }

  if (isTwoPair(cards)) {
    return 'two_pair'
  }

  if (ofAkind.count === 2) {
    return 'pair_' + ofAkind.value
  }

  const hand = player.hand.sort(function (a, b) {
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
            <div className="oppName">
              <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip" />
              {this.props.players[1].chipCount}
            </div>
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
              <div className="playerName">
                <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip"/>
                {this.props.players[0].chipCount}
              </div>
              <div className="clear" />
              {this.playerButtons(this.props.players[0])}
            </div>
            <div>Pot:{this.props.pot} CurrentBet:{this.props.currentBet}</div>
            <div className="clear" />
          </div>
        </div>
      </div>
    )
  }
}

/* Redux: map state in store to props for easy access */
const mapStateToProps = (state) => {
  return {
    players: state.players,
    deck: state.deck,
    flop: state.flop,
    currentBet: state.bet,
    lastMove: state.lastMove,
    pot: state.pot
  }
}

/* Redux: map actions to props for easy reference */
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
  onResetFlop: resetFlop
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
