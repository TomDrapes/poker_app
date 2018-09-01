import React, {Component} from 'react'
import Message from './message'
import { connect } from 'react-redux'
import { newMsg } from '../../Actions/MessageActions'
import './style.css'

class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      msg: ''
    }
  }

  onInputChange (msg) {
    this.setState({msg})
  }

  submit = (e) => {
    e.preventDefault()
    this.props.onNewMessage(<Message name='John' message={' ' + this.state.msg} />)
    this.setState({msg: ''}) // Clears input field after msg submitted
  }

  render () {
    return (
      <div>
        <div className="messageWindow">
          {this.props.messages}
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
    messages: state.messages
  }
}

const mapActionsToProps = {
  onNewMessage: newMsg
}

export default connect(mapStateToProps, mapActionsToProps)(Chat)
