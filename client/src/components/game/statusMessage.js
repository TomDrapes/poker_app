import React, { Component } from 'react'

export default class StatusMessage extends Component {

  message() {
    if(this.props.player.playersTurn){
      return <div>Your turn.</div>
    }else if(this.props.opponent){
      return <div><i className="fa fa-spinner fa-spin"></i> Waiting for {this.props.opponent.name}</div>
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
