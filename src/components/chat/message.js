import React, {Component} from 'react';

export default class Message extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="message">
        {this.props.name}:{this.props.message}
      </div>
    )
  }
}
