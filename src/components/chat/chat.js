import React, {Component} from 'react';
import Message from './message';
import './style.css';


export default class Chat extends Component {

  render(){
    return(
      <div>
        <div className="messageWindow">
          <Message name="John" message="How are you?" />
          <Message name="Jerry" message="Good thanks, you?" />
          <Message name="John" message="I'm good. Are you ready to play?" />
        </div>
        <div className="chatInputWrapper">
          <div className="input"> Write something...
            <div className="submitBtn">Submit</div>
          </div>
        </div>
      </div>
    )
  }
}
