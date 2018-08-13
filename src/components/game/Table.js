import React, { Component } from 'react'
import Card from './card'
import Deck from './deck'
import Chat from '../chat/chat'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop } from '../../Actions/FlopActions'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deck: this.props.deck,
      flop: this.props.flop      
    }

    this.onUpdateDeck = this.onUpdateDeck.bind(this)
    this.onUpdateFlop = this.onUpdateFlop.bind(this)
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

  onUpdateDeck (deck) {
    this.props.onUpdateDeck(deck)
  }

  onUpdateFlop (flop) {
    this.props.onUpdateFlop(flop)
  }

  render () {
    return (
      <div className="table">
        <div className="gameWindow">
          <div className="oppSide">
            <div className="oppName">Jerry: $350</div>
            <Card />
            <Card />
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
            <Card />
            <Card />
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

const mapStateToProps = createSelector(
  deckSelector,
  flopSelector,
  (deck, flop) => ({
    deck,
    flop
  })
)

const mapActionsToProps = {
  onUpdateDeck: updateDeck,
  onUpdateFlop: updateFlop
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
