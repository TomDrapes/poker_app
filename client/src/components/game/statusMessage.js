import React, { Component } from 'react'

export default class StatusMessage extends Component {

  message() {
    if(this.props.player.playersTurn){
      return <div>{this.props.message.toUpperCase()}</div>
    }else if(this.props.opponent){
      return <div><i className="fa fa-spinner fa-spin"></i> WAITING FOR {this.props.opponent.name.toUpperCase()}</div>
    }
  }
  render() {
    return(
      <div className='status'>
        {this.message()}
      </div>
    )
  }
}
