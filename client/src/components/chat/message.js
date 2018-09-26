import React, {Component} from 'react'

export default class Message extends Component {
  render () {
    return (
      <div>
        {this.props.id % 2 === 0 ? (
          <div className='message' style={{background: 'rgb(220,220,220)'}}>
            <strong>{this.props.name}:</strong>{this.props.message}
          </div>
        ) : (
          <div className='message' style={{background: 'rgb(255,255,255)'}}>
            <strong>{this.props.name}:</strong>{this.props.message}
          </div>)
        }
      </div>
    )
  }
}
