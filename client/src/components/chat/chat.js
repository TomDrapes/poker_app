import React, {Component} from 'react'
import Message from './message'
import { connect } from 'react-redux'
import { newMsg, updateMessages } from '../../Actions/MessageActions'
import axios from 'axios'
import './style.css'


class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      msg: '',
      socket: this.props.socket,
      msg_pending: false
    }

    this.state.socket.on('new_msg_available', () => {
      this.receiveSocketIO('new_msg_available')
    })

    this.state.socket.on('message_pending', () => {
      this.receiveSocketIO('message_pending')
    })
  }

  receiveSocketIO = (status) => {
    if(status === 'new_msg_available'){
      axios.get(`/api/gamestate/${this.props.gameId}`)
        .then(res => {
          console.log("here")
          console.log(res)
          this.props.onUpdateMessages(res.data.messages)
        })
        .catch(err => console.log(err))
    }else if(status === 'message_pending'){
      this.setState({ msg_pending: true })
      setTimeout(() => {
        this.setState({ msg_pending: false})
      }, 5000)
    }
  }

  sendSocketIO = (status) => {
    this.state.socket.emit(status)
  }

  onInputChange (msg) {
    this.setState({msg})
    this.sendSocketIO('message_pending')
  }

  opponentName(){
    if(this.props.players[0] && this.props.players[1]){
      if(this.props.playerId === 1){
        return this.props.players[1].name
      }
      return this.props.players[0].name
    }
  }

  messages() {
    return this.props.messages.map((msg) =>
        <Message name={msg.name} message={msg.message} id={msg.id} key={msg.key} />
      )
  }

  submit = (e) => {
    e.preventDefault()
    //this.props.onNewMessage(<Message name={this.props.players[this.props.playerId-1].name} message={' ' + this.state.msg} key={this.props.messages.length} id={this.props.messages.length}/>)
    this.props.onNewMessage({
      name: this.props.players[this.props.playerId-1].name,
      message: ' ' + this.state.msg,
      key: this.props.messages.length,
      id: this.props.messages.length
    })
    this.setState({msg: ''}) // Clears input field after msg submitted
    setTimeout(() => {
      let gameState = {
        _id: this.props.gameId,
        players: this.props.players,
        bet: this.props.bet,
        pot: this.props.pot,
        flop: this.props.flop,
        deck: this.props.deck,
        lastMove: this.props.lastMove,
        messages: this.props.messages
      }
      axios.put(`/api/gamestate/${this.props.gameId}`, gameState)
        .then(res => {
          console.log(res)
          this.sendSocketIO('new_message')
        }).catch(err => console.log(err))

    }, 2000)
  }

  render () {
    return (
      <div className="chatWindow">
        <div className="messageWindow">
          {this.messages()}
        </div>
        <div>
          {this.state.msg_pending ?
            <div className="msg-status">{this.opponentName()} is typing...</div> :
            <div className="msg-status">&spades;&clubs;&diams;&hearts;</div>}
        </div>
        <div className="chatInputWrapper">
          <form id='message_form' onSubmit={this.submit} className='input-group'>
            <input className='form-control'
              onChange={event => this.onInputChange(event.target.value)}
              value={this.state.msg}
              placeholder="Write something..." />
            <span className='input-group-btn'>
              <button type='submit' className='btn btn-secondary' >Submit</button>
            </span>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    gameId: state.localState.gameId,
    playerId: state.localState.playerId,
    players: state.players,
    bet: state.bet,
    pot: state.pot,
    flop: state.flop,
    deck: state.deck,
    lastMove: state.lastMove,
  }
}

const mapActionsToProps = {
  onNewMessage: newMsg,
  onUpdateMessages: updateMessages
}

export default connect(mapStateToProps, mapActionsToProps)(Chat)
