import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePlayer } from '../../Actions/PlayersActions'
import { updateGameId, updatePlayerId, updateDB } from '../../Actions/LocalStateActions'
import uuid from 'uuid'
import axios from 'axios'
import './style.css'

class Lobby extends Component {
  constructor(props){
    super(props);

    this.state = {
      games: [],
      name: '',
      gameId: '',
      playerId: 0,
      showNameInput: false,
      showGamesList: false,
      showMainMenu: true,
      redirect: false
    }
  }

  componentDidMount(){
    // Get URLS for all current games in the DB
    axios.get('/api/gamestate')
      .then(res =>
        res.data.map(data =>
          this.setState({
            games: [...this.state.games, data._id]
        })))
      .catch(err => console.log(err));
  }

  /* Determine whether to show main menu, lobby menu or name input box */
  toggleView = (showMenu, showInput, showGames) => {
    this.setState({
      showMainMenu: showMenu,
      showNameInput: showInput,
      showGamesList: showGames
    });
  }

  onInputChange (name){
    this.setState({name})
  }

  /* After selecting new game or game from lobby enter name input */
  enterGame(gameId, playerId) {
    this.setState({ gameId })
    this.setState({ playerId })
    // Menu | NameInput | Games list
    this.toggleView(false, true, false)
  }

  newGame() {
    let id = uuid();
    return (
      <div className="menu-btn-container">
        <button className="menu-btn" onClick={() => this.enterGame(id, 1)}>New Game</button>
      </div>
    )
  }

  joinGame() {
    return (
      <div className="menu-btn-container">
        <button className="menu-btn" onClick={() => this.toggleView(false, false, true)}>Join</button>
      </div>
    )
  }

  submit = (e) => {
    e.preventDefault()
    this.initiatePlayer(this.state.playerId, this.state.gameId)
    this.setState({ redirect: !this.state.redirect })
  }

  nameInput () {
    return (
      <div className="input-field">
        <form onSubmit={this.submit}>
          <input
            className='input-name'
            onChange={event => this.onInputChange(event.target.value)}
            value={this.state.name}
            placeholder="Enter your name"
            autoFocus={true}
          />
        </form>
      </div>
    )
  }

  /* Create new player and update info in redux store */
  initiatePlayer(playerId, gameId) {
    this.props.onUpdateGameId(gameId)
    this.props.onUpdatePlayerId(playerId)
    this.props.onUpdateDB(false)
    let playersTurn = false
    if(playerId === 2){
      playersTurn = true
    }
    let player = {
      name: this.state.name,
      hand: [],
      folded: false,
      hasDealerChip: true,
      playersTurn: playersTurn,
      chipCount: 200,
      betAmountSoFar: 0
    }
    this.props.onUpdatePlayer([player])
  }

  render () {
    if(this.state.redirect){
      return ( <Redirect push to={`./game/${this.state.gameId}`} /> )
    }
    const games = this.state.games.map((game) => {
      return(
        <li  className="game-url" key={game} onClick={() => this.enterGame(game, 2)}>{game}</li>
      );
    });
    return(
      <div className="lobby-wrapper">
        { this.state.showGamesList && <div className="games-list">{games}</div> }

        { this.state.showNameInput && <div>{this.nameInput()}</div>  }

        { this.state.showMainMenu &&
          <div>
            <div>{this.newGame()}</div>
            <div>{this.joinGame()}</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    deck: state.deck,
    players: state.players
  }
}

const mapActionsToProps = {
  onUpdatePlayer: updatePlayer,
  onUpdateGameId: updateGameId,
  onUpdatePlayerId: updatePlayerId,
  onUpdateDB: updateDB
}

export default connect(mapStateToProps, mapActionsToProps)(Lobby)
