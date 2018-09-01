import React, { Component } from 'react'
import './style.css'

export default class Connection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: this.props.name,
      status: this.props.status
    }
  }

  render () {
    return (
      <div className="connectionWrapper">
        <div className="connectionIcon" />
        <div className="name">{this.state.name}</div>
      </div>
    )
  }
}
