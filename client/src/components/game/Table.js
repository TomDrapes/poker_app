
import React, { Component } from 'react'
import Deck from './deck'
import axios from 'axios'
import Card from './card'
import Spinner from './spinner'
import Overlay from './overlay'
import Opponent from './opponent'
import Player from './player'
import Flop from './flop'
import { connect } from 'react-redux'
import { updateDeck } from '../../Actions/DeckActions'
import { updateFlop, resetFlop } from '../../Actions/FlopActions'
import { updatePlayer, updatePlayersTurn, updateChipCount, wonPot } from '../../Actions/PlayersActions'
import { updateBet } from '../../Actions/BetActions'
import { updateLastMove } from '../../Actions/MoveActions'
import { updatePot } from '../../Actions/PotActions'
import { updateGameId, updatePlayerId } from '../../Actions/LocalStateActions'
import { determineBestHand} from './handAlgorithms'

class Table extends Component {
  constructor (props) {
    super(props)

    this.state = {
      betAmount: this.props.currentBet,
      loading: true,
      socket: this.props.socket,
      flop: 0,
      lastMove: `It's your turn`,
      showHand: false,
      status: {}
    }

    this.state.socket.on('new_state_available', (opp_move) => {
      console.log("Updating state...\n");
      this.receiveSocketIO(opp_move);
    })
  }

  /* Update state in redux when client receives signal that new state is available */
  receiveSocketIO = (opponents_move) => {
    console.log('receiving on socket')
    axios.get(`/api/gamestate/${this.props.localState.gameId}`)
      .then(res => {
        this.props.onUpdateBet(res.data.bet)
        this.props.onUpdatePlayer(res.data.players)
        this.props.onUpdateFlop(res.data.flop)
        this.props.onUpdateLastMove(res.data.lastMove)
        this.props.onUpdatePot(res.data.pot)
        this.props.onUpdateDeck(res.data.deck)
        this.setState({
          loading: false,
          lastMove: opponents_move
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  /* Get server to broadcast to opponent that either a game is created or state has been updated */
  sendSocketIO = (msg) => {
    console.log('sending on socket')
    switch(msg) {
      case 'new_game':
        this.state.socket.emit('game_created', this.state.lastMove)
        break;
      case 'state_updated':
        this.state.socket.emit('state_updated', this.state.lastMove)
        break;
      default:
        console.log("Error: /Table.js sendSocketIO")
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
  componentDidUpdate (prevProps, prevState) {

    if ((this.props.lastMove === 'both_checked'
      && this.state.flop === 6
      && prevProps.lastMove !== 'show_cards'
      && prevProps.lastMove !== 'both_checked')
      || (this.props.lastMove === 'called'
      && this.state.flop === 5)) {
      this.showCards(prevState)
    } else if (this.props.lastMove === 'called') {
      this.flop()
    } else if (this.props.lastMove === 'folded') {
      this.shuffle(this.props.deck)
    } else if (this.props.lastMove === 'shuffled') {
      this.deal()
    }else if (this.props.lastMove === 'round_completed'){
      if(this.props.players[this.props.localState.playerId-1].playersTurn){
        this.shuffle(this.props.deck)
      }
    }else if(this.props.lastMove === 'dealt' && prevProps.lastMove !== 'dealt'){
      this.setState({
        flop: 0,
        showHand: false,
        lastMove: ''
      })
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
    console.log('updating DB...')
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
      console.log('update DB 2')
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
    this.setState({ flop: this.state.flop + 1 })
    console.log('outside flop')
    if(this.state.flop < 5){
      console.log('inside flop')
      let flop = this.props.flop
      let deck = this.props.deck
      flop.push(deck[0])
      deck.shift()
      this.props.onUpdateDeck(deck)
      this.props.onUpdateFlop(flop)
      this.props.onUpdateLastMove('flopped')
      setTimeout(() => {
        console.log('update DB 3')
        this.updateDatabase()
      },3000)
    }
  }

  /* Make check move and update state in store */
  check () {
    this.updateLastMove(`${this.playersName()} checked`)
    if (this.props.lastMove === 'checked') {
      this.props.onUpdatePlayersTurn(this.props.players[1])
      this.props.onUpdatePlayersTurn(this.props.players[0])
      this.props.onUpdateLastMove('both_checked')
      this.flop()
    } else {
      //if(this.state.flop === 6) { this.flop() }
      this.setState({ flop: this.state.flop + 1 })
      this.props.onUpdateLastMove('checked')
      this.props.onUpdatePlayersTurn(this.props.players[1])
      this.props.onUpdatePlayersTurn(this.props.players[0])
      setTimeout(() => {
        this.updateDatabase()
      },2000)
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
      this.updateLastMove(`${this.playersName()} bet ${this.state.betAmount}`)
      setTimeout(() => {
        console.log('update DB 4')
        this.updateDatabase()
      }, 2000)

    // Last Move was a bet/raise and player calling
    } else if ((this.state.betAmount === this.props.currentBet && this.props.lastMove === 'bet') ||
    (this.state.betAmount === this.props.currentBet && this.props.lastMove === 'raised')) {
      this.props.onUpdateLastMove('called')
      this.props.onUpdateChipCount(player, this.props.currentBet)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
      this.updateLastMove(`${this.playersName()} called ${this.state.betAmount}`)
      setTimeout(() => {
        console.log('update DB 5')
        this.updateDatabase()
      }, 2000)

    // Last move was a bet and player is raising
    } else if (this.props.lastMove === 'bet' && this.state.betAmount > this.props.currentBet) {
      this.props.onUpdateBet(this.state.betAmount)
      this.props.onUpdateLastMove('raised')
      this.props.onUpdateChipCount(player, this.state.betAmount)
      this.props.onUpdatePot(this.props.pot + this.state.betAmount)
      this.updateLastMove(`${this.playersName()} raised the bet to ${this.state.betAmount}`)
      setTimeout(() => {
        console.log('update DB 6')
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
    // Update local lastMove to send to opponent
    this.updateLastMove(`${this.playersName()} folded`)
  }



  updateLastMove(lastMove){
    this.setState({ lastMove: '> ' + lastMove  })
  }

  /* When both players call, show cards and determine winner */
  showCards (prevState) {

    console.log('update DB 1')
    this.updateDatabase()

    let p1Hand = determineBestHand(
      this.props.players[0].hand, this.props.flop, this.props.localState.deck
    )
    let p2Hand = determineBestHand(
      this.props.players[1].hand, this.props.flop, this.props.localState.deck
    )

    let winner = ''
    if(p1Hand.value > p2Hand.value){
      winner = this.props.players[0].name + ' wins the pot\n'
      this.props.onWonPot(this.props.players[0], this.props.pot)
    }else if(p2Hand.value > p1Hand.value){
      winner = this.props.players[1].name + ' wins the pot\n'
      this.props.onWonPot(this.props.players[1], this.props.pot)
    }else{
      winner = 'Draw'
      this.props.onWonPot(this.props.players[0], this.props.pot/2)
      this.props.onWonPot(this.props.players[1], this.props.pot/2)
    }

    let status = {
      p1: this.props.players[0].name +' has ' + p1Hand.type,
      p2: this.props.players[1].name + ' had ' + p2Hand.type,
      winner: winner
    }

    this.setState({
      status: status,
      showHand: true
    })

    this.props.onUpdateLastMove('show_cards')
  }

  nextRound () {
    this.props.onUpdateLastMove('round_completed')
    this.props.onUpdateBet(10)
    this.props.onUpdatePot(0)
    this.props.onUpdatePlayersTurn(this.props.players[1])
    this.props.onUpdatePlayersTurn(this.props.players[0])

    this.setState({
      showHand: false,
      flop: 0,
      lastMove: ''
    })
  }

  opponent(){
    if(this.props.localState.playerId === 1){
      return 1
    }
    return 0
  }

  playersName(){
    return this.props.players[this.props.localState.playerId-1].name
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
            { this.props.players[this.props.localState.playerId-1].playersTurn &&
              <div>
                Your turn.
              </div> }
            { !this.props.players[this.props.localState.playerId-1].playersTurn && this.props.players[this.opponent()] && <div><i className="fa fa-spinner fa-spin"></i> Waiting for {this.props.players[this.opponent()].name}</div>}
            </div>
            <div className="pot">Pot: {this.props.pot}</div>

            <Opponent
              player={this.props.players[this.opponent()]}
              showHand={this.state.showHand}
              deck={this.props.localState.deck}
            />

            <Flop flop={this.props.flop.map(key => this.props.localState.deck[key-1].card)} />

            <Player
              player={this.props.players[this.props.localState.playerId-1]}
              deck={this.props.localState.deck}
              betAmount={this.state.betAmount}
              currentBet={this.props.currentBet}
              lastMove={this.props.lastMove}
              fold={(player) => this.fold(player)}
              bet={(player) => this.bet(player)}
              increaseBet={(player) => this.increaseBet(player)}
              decreaseBet={() => this.decreaseBet()}
              check={() => this.check()}
            />


            <Overlay msg={this.state.status} showOverlay={this.state.showHand} nextRound={() => this.nextRound()}/>
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
