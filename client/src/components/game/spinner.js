import React, { Component } from 'react'

export default class Spinner extends Component {
  constructor(props){
    super(props);

    this.state = {
      message: this.props.msg
    }
  }
  render() {
    return (
      <div className="spinner">
        <div className="spinner-text">{this.state.message}</div>
        <i className="fa fa-spinner fa-spin" ></i>
      </div>
    )
  }
}
