import React, { Component } from 'react'
import Connection from './Connection'
import './style.css'

export default class Header extends Component {
  render () {
    return (
      <div className="headerWrapper">
        <span>
          <img src={require('../../images/Poker-logo-white.png')} height='80' alt="logo" />
          <Connection name="John" status="connected"></Connection>
          <Connection name="Jerry" status="connected" />
        </span>
        <div className="clear" />
      </div>
    )
  }
}
