import React, { Component } from 'react'
import './style.css'

export default class Connection extends Component {

  render () {
    return (
      <div className="connectionWrapper">
        <div className="connectionIcon" />
        <div className="name">{this.props.name}</div>
      </div>
    )
  }
}
