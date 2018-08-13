import React, { Component } from 'react'
import Card from './card'
import Deck from './deck'
import Chat from '../chat/chat'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop } from '../../Actions/FlopActions'
import { updatePlayer } from '../../Actions/PlayersActions'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deck: this.props.deck,
      flop: this.props.flop,
      players: this.props.players 
    }

    this.onUpdateDeck = this.onUpdateDeck.bind(this)
    this.onUpdateFlop = this.onUpdateFlop.bind(this)
   // this.onUpdatePlayer = this.onUpdatePlayer.bind(this)

    this.deal()
  }

  deal () {
    console.log(this.state.deck)
    let p = this.state.players
    let deck = this.state.deck
    for(let i = 0 ; i < this.state.players.length; i++){
      for(let j = 0; j < 2; j++){
        this.state.players[i].hand.push(deck[0])
        deck.shift()
      }
    }
    this.onUpdateDeck(deck)
  }

  shuffle (deck) {
    return deck.sort(function (a, b) { return 0.5 - Math.random() })
  }

  flop () {
    let f = this.state.flop
    let d = this.shuffle(this.state.deck)

    for (let i = 0; i < 5; i++) {
      f.push(d[0])
      d.shift()
    }
    this.onUpdateDeck(d)
    this.onUpdateFlop(f)
    return f.map(x => x.card)
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

  /*onUpdatePlayer (players) {
    this.props.onUpdatePlayer(players)
  }*/

  render () {
    return (
      <div className="table">
        <div className="gameWindow">
          <div className="oppSide">
            <div className="oppName">Jerry: $350</div>
            {this.playersHand(this.state.players[0])}
            <div className="clear" />
          </div>
          <div className="flopWrapper">
            <div className="flop">
              <Deck />
              {this.flop()}
              <div className="clear" />
            </div>
          </div>
          <div className="playerSide">
            {this.playersHand(this.state.players[1])}
            <div className="btnWrapper">
              <div className="statusMsg">Waiting for Jerry...</div>
              <div className="clear" />
              <div className="playerName">John: $250</div>
              <div className="clear" />
              <div className="checkBtn">Check</div>
              <div className="foldBtn">Fold</div>
              <div className="betBtn">Bet</div>
              <div className="betAmount">$50</div>
            </div>
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

const deckSelector = createSelector(
  state => state.deck,
  deck => deck
)

const flopSelector = createSelector(
  state => state.flop,
  flop => flop
)

const playerSelector = createSelector(
  state => state.players,
  players => players
)

const mapStateToProps = createSelector(
  deckSelector,
  flopSelector,
  playerSelector,
  (deck, flop, players) => ({
    deck,
    flop,
    players
  })
)

const mapActionsToProps = {
  onUpdateDeck: updateDeck,
  onUpdateFlop: updateFlop,
  onUpdatePlayer: updatePlayer
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
