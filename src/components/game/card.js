import React, { Component } from 'react'
import './style.css'

export default class Card extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div className="cardWrapper"><img src={this.props.image} width='100' height='140' alt='card'/></div>
    )
  }
}
