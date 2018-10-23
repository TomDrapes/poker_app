import React, { Component } from 'react'

export default class Overlay extends Component {

    render(){
        return (
            <div onClick={this.props.nextRound}>
                {this.props.showOverlay && 
                    <div className="overlay-container">
                        <div className="p1-hand">{this.props.msg.p1}</div><br/>
                        <div className="p2-hand">{this.props.msg.p2}</div><br/>
                        <div className="winner">{this.props.msg.winner}</div>
                    </div>
                }
            </div>
        )
    }
}