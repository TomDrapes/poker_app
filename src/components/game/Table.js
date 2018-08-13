import React, { Component } from 'react'
import Card from './card'
import Deck from './deck'
import Chat from '../chat/chat'
import connect from '../../../node_modules/react-redux/lib/connect/connect'
import { createSelector } from 'reselect'
import { updateDeck } from '../../Actions/DeckActions'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deck: this.props.deck,
      flop: []
    }

    this.onUpdateDeck = this.onUpdateDeck.bind(this)
  }

  shuffle (deck) {
    return deck.sort(function (a, b) { return 0.5 - Math.random() })
  }

  flop () {
    let f = this.state.flop
    let d = this.shuffle(this.state.deck)

    for (let i = 0; i < 5; i++) {
      f.push(d[0].card)
      d.shift()
    }
    this.onUpdateDeck(d)
    return f
  }

  onUpdateDeck (deck) {
    this.props.onUpdateDeck(deck)
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

const mapStateToProps = createSelector(
  deckSelector,
  (deck) => ({
    deck
  })
)

const mapActionsToProps = {
  onUpdateDeck: updateDeck
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
