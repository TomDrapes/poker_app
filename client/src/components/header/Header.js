import React, { Component } from 'react'
import { connect } from 'react-redux'
import Connection from './Connection'
import './style.css'

class Header extends Component {

  render () {
    return (
      <div className="headerWrapper">
        <span>
          <img src={require('../../images/Poker-logo-white.png')} height='80' alt="logo" />
          {this.props.players[0] && <Connection name={this.props.players[0].name} />}
          {this.props.players[1] && <Connection name={this.props.players[1].name} />}
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(Header)
