
import React, { Component } from 'react'
import Deck from './deck'
import axios from 'axios'
import Card from './card'
import Spinner from './spinner'
import { connect } from 'react-redux'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop, resetFlop } from '../../Actions/FlopActions'
import { updatePlayer, updatePlayersTurn, updateChipCount, wonPot } from '../../Actions/PlayersActions'
import { updateBet } from '../../Actions/BetActions'
import { updateLastMove } from '../../Actions/MoveActions'
import { updatePot } from '../../Actions/PotActions'
import { updateGameId, updatePlayerId } from '../../Actions/LocalStateActions'
import { isFlush, isRoyalFlush, isStraightFlush,
  isOfAKind, isFullHouse, isStraight, isTwoPair, determineBestHand} from './handAlgorithms'
import uuid from 'uuid'


class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      betAmount: this.props.currentBet,
      loading: true,
      socket: this.props.socket,
      flop: 0
    }

    this.state.socket.on('new_state_available', () => {
      console.log("Updating state...\n");
      this.receiveSocketIO();
    })
  }

  /* Update state in redux when client receives signal that new state is available */
  receiveSocketIO = () => {
    axios.get(`/api/gamestate/${this.props.localState.gameId}`)
      .then(res => {
        this.props.onUpdateBet(res.data.bet)
        this.props.onUpdatePlayer(res.data.players)
        this.props.onUpdateFlop(res.data.flop)
        this.props.onUpdateLastMove(res.data.lastMove)
        this.props.onUpdatePot(res.data.pot)
        this.props.onUpdateDeck(res.data.deck)
        this.setState({ loading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  /* Get server to broadcast to opponent that either a game is created or state has been updated */
  sendSocketIO = (msg) => {
    switch(msg) {
      case 'new_game':
        this.state.socket.emit('game_created')
      case 'state_updated':
        this.state.socket.emit('state_updated')
    }
  }

  /* Update current bet amount in local state if opponent raises */
  componentWillReceiveProps(){
    this.setState({ betAmount: this.props.currentBet })
  }

  /* When component mounts there are 3 cases:
    1: Mounting for player 1 in which case new game state is created and then wait for player 2
    2: Mounting for player 2 - perform http request to retrieve game state and also update game state with player 2 info
    3: Returning to game after closing tab - retrieve data from localStorage to then perform http request for game data
  */
  componentDidMount(){
    if(this.props.localState.playerId === 1){
      this.saveStateLocally()
      this.createNewGame();
    }else if(this.props.localState.playerId === 2){
      this.saveStateLocally()
      axios.get(`/api/gamestate/${this.props.localState.gameId}`)
        .then(res => {
          let p = res.data.players
          p.push(this.props.players[0])

          this.props.onUpdatePlayer(p)

          this.shuffle(res.data.deck)

          let gameState = {
            ...res.data,
            players: this.props.players,
            lastMove: this.props.lastMove,
            deck: this.props.deck
          }

          axios.put(`/api/gamestate/${this.props.localState.gameId}`, gameState)
            .then(res => console.log(res))
            .catch(err => console.log(err))

          this.sendSocketIO('new_game')
          this.setState({
            loading: false
          })
        }).catch(err => console.log(err))
    }else if(window.location.pathname === `/game/${localStorage.getItem('gameId')}`){
      this.retrieveLocalStorage()
      console.log('retrieving')
    }
  }

  /* When component updates check what the last move was and handle accordingly */
  componentDidUpdate () {

    if ((this.props.lastMove === 'both_checked' && this.state.flop === 6) ||
      (this.props.lastMove === 'called' && this.state.flop === 5)) {
      this.showCards()
    } else if (this.props.lastMove === 'called') {
      this.flop()
    } else if (this.props.lastMove === 'folded' || this.props.lastMove === 'round_completed') {
      this.shuffle(this.props.deck)
    } else if (this.props.lastMove === 'shuffled') {
      this.deal()
    }
  }

  saveStateLocally(){
    localStorage.setItem('gameId', this.props.localState.gameId)
    localStorage.setItem('playerId', this.props.localState.playerId)
  }

  /* Retrieve playerId and gameId from localStorage and then perform http request for game state data */
  retrieveLocalStorage(){
    let gameId = localStorage.getItem('gameId')
    let playerId = localStorage.getItem('playerId')
    this.props.onUpdateGameId(gameId)
    this.props.onUpdatePlayerId(playerId)
    axios.get(`/api/gamestate/${gameId}`)
      .then(res => {
        this.props.onUpdatePlayer(res.data.players)
        this.props.onUpdateDeck(res.data.deck)
        this.props.onUpdateFlop(res.data.flop)
        this.props.onUpdateBet(res.data.bet)
        this.props.onUpdateLastMove(res.data.lastMove)
        this.props.onUpdatePot(res.data.pot)
        this.setState({ loading: false })
      })
  }

  updateDatabase() {
    let gameState = {
      _id: this.props.localState.gameId,
      players: this.props.players,
      bet: this.props.currentBet,
      pot: this.props.pot,
      flop: this.props.flop,
      deck: this.props.deck,
      lastMove: this.props.lastMove,
      messages: this.props.messages
    }
    axios.put(`/api/gamestate/${this.props.localState.gameId}`, gameState)
      .then(res => {
        console.log(res)
        this.sendSocketIO('state_updated')
      })
      .catch(err => console.log(err))
  }

  createNewGame() {
    //Create game state
    let newGameState = {
      _id: this.props.localState.gameId,
      players: this.props.players,
      flop: [],
      bet: 10,
      lastMove: '',
      pot: 0,
      deck: this.props.localState.deck.map(card => card.key),
      messages: []
    }
    axios.put(`/api/gamestate/`, newGameState)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
    this.setState({ flop: 0 })
    setTimeout(() => {
      this.updateDatabase()
    },2000)
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
    this.setState({ flop: this.state.flop + 1 })
    setTimeout(() => {
      this.updateDatabase()
    },2000)
  }

  /* Returns array of the players cards to be displayed */
  playersHand (player) {
    if(player){
      if (player.hand.length === 2) {
        return player.hand.map(key => this.props.localState.deck[key-1].card)
      }
    }
    return null
  }

  opponentsHand () {
    return (
      [
        <Card image={require('../../images/cards/back.png')} key={0}/>,
        <Card image={require('../../images/cards/back.png')} key={1}/>,
      ]
    )
  }

  /* JSX to enable players buttons if it's their turn */
  playerButtons (player, betAmount) {
    if(player){
      if (player.playersTurn) {
        return (
          <div>
            {this.checkButton()}
            <button className="foldBtn" onClick ={() => this.fold(player)}>FOLD</button>
            <button type="button" className="betBtn" onClick={() => this.bet(player)}>BET</button>
            {this.betIncrementor(player, betAmount)}
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
    setTimeout(() => {
      this.updateDatabase()
    },2000)
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
      setTimeout(() => {
        this.updateDatabase()
      }, 2000)

    // Last Move was a bet/raise and player calling
    } else if ((this.state.betAmount === this.props.currentBet && this.props.lastMove === 'bet') ||
    (this.state.betAmount === this.props.currentBet && this.props.lastMove === 'raised')) {
      this.props.onUpdateLastMove('called')
      this.props.onUpdateChipCount(player, this.props.currentBet)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
      setTimeout(() => {
        this.updateDatabase()
      }, 2000)

    // Last move was a bet and player is raising
    } else if (this.props.lastMove === 'bet' && this.state.betAmount > this.props.currentBet) {
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdateLastMove('raised')
      this.props.onUpdateChipCount(player, this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
      setTimeout(() => {
        this.updateDatabase()
      }, 2000)
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
  betIncrementor = (player, betAmount) => (
    <div className="betAmount">
      <i className="fa fa-caret-up" onClick={() => this.increaseBet(player)} />
      <div>{betAmount}</div>
      <i className="fa fa-caret-down" onClick={() => this.decreaseBet()} />
    </div>
  )

  /* When both players call, show cards and determine winner */
  showCards () {
    let p1Hand = determineBestHand(
      this.props.players[0].hand, this.props.flop, this.props.localState.deck
    )
    let p2Hand = determineBestHand(
      this.props.players[1].hand, this.props.flop, this.props.localState.deck
    )
    console.log(
      this.props.players[0].name +' has ' + p1Hand.type + '\n' +
      this.props.players[1].name + ' had ' + p2Hand.type + '\n'
    )
    if(p1Hand.value > p2Hand.value){
      console.log(this.props.players[0].name + ' wins the pot\n')
      this.props.onWonPot(this.props.players[0], this.props.pot)
    }else if(p2Hand.value > p1Hand.value){
      console.log(this.props.players[1].name + ' wins the pot\n')
      this.props.onWonPot(this.props.players[1], this.props.pot)
    }else{
      console.log('Draw')
      this.props.onWonPot(this.props.players[0], this.props.pot/2)
      this.props.onWonPot(this.props.players[1], this.props.pot/2)
    }

    // Revert bet amount back to start state locally and in store */
    this.props.onUpdateBet(10)
    this.setState({ betAmount: 10 })
    // Update state in store
    this.props.onUpdateLastMove('round_completed')
    this.props.onUpdatePot(0)
    this.props.onUpdatePlayersTurn(this.props.players[1])
    this.props.onUpdatePlayersTurn(this.props.players[0])
  }

  opponent(){
    if(this.props.localState.playerId === 1){
      return 1
    }
    return 0
  }

  render () {
    return (
      <div className="table">
        { this.state.loading &&
          <div className="gameWindow">
            <Spinner msg={"Waiting for opponent to join..."}/>
          </div>
        }

        { !this.state.loading &&
          <div className="gameWindow">

            <div className='status'>
            { this.props.players[this.props.localState.playerId-1].playersTurn && <div>Your turn</div> }
            { !this.props.players[this.props.localState.playerId-1].playersTurn && this.props.players[this.opponent()] && <div><i className="fa fa-spinner fa-spin"></i> Waiting for {this.props.players[this.opponent()].name}</div>}
            </div>
            <div className="pot">Pot: {this.props.pot}</div>
            <div className="oppSide">
              <div className="oppName">
                <div>
                  {this.props.players[this.opponent()] && this.props.players[this.opponent()].name}
                </div>
                <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip" />
                {this.props.players[this.opponent()] && this.props.players[this.opponent()].chipCount }
              </div>
              {this.props.players[this.opponent()] && this.opponentsHand()}
              <div className="clear" />
            </div>
            <div className="flopWrapper">
              <div className="flop">
                <Deck />
                {this.props.flop.map(key => this.props.localState.deck[key-1].card)}
                <div className="clear" />
              </div>
            </div>
            <div className="playerSide">
              {this.props.players[this.props.localState.playerId-1] &&
                 this.playersHand(this.props.players[this.props.localState.playerId-1])}
              <div className="btnWrapper">
                <div className="statusMsg">{this.props.players[this.props.localState.playerId-1].name}</div>
                <div className="clear" />
                <div className="playerName">
                  <img className='pokerChip' src={require('../../images/poker_chip.png')} height='50' width='50' alt="poker chip"/>
                  {this.props.players[this.props.localState.playerId-1] &&
                    this.props.players[this.props.localState.playerId-1].chipCount}
                </div>
                <div className="clear" />
                {this.props.players[0] &&
                  this.playerButtons(this.props.players[this.props.localState.playerId-1], this.state.betAmount)}
              </div>
              <div className="clear" />
            </div>
          </div>
        }
      </div>
    )
  }
}

/* Redux: map state in store to props for easy access */
const mapStateToProps = (state) => {
  return {
    gameId: state.gameId,
    players: state.players,
    deck: state.deck,
    flop: state.flop,
    currentBet: state.bet,
    lastMove: state.lastMove,
    pot: state.pot,
    localState: state.localState
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
  onResetFlop: resetFlop,
  onUpdateGameId: updateGameId,
  onUpdatePlayerId: updatePlayerId
}

export default connect(mapStateToProps, mapActionsToProps)(Table)
