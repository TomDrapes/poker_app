import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import axios from 'axios'
import './style.css'

export default class Lobby extends Component {
  constructor(props){
    super(props);

    this.state = {
      joinSelected: false,
      games: []
    }
  }

  componentDidMount(){
    axios.get('/api/gamestate')
      .then(res =>
        res.data.map(data => this.setState({
          games: [...this.state.games, data._id]
        })));
  }

  host() {
    let id = uuid();
    return (
      <button><Link className='host-link' to={`./${id}`} >Host</Link></button>
    )
  }

  join() {
    return (
      <button
      onClick={() => this.setState({joinSelected: !this.state.joinSelected})}
      >Join</button>
    )
  }

  render () {
    const games = this.state.games.map((game) => {
      return(
        <li><Link className='game-link' to={`./${game}`} >{game}</Link></li>
      );
    });
    return(
      <div>
        {this.state.joinSelected ?
          <div>
            {games}
          </div>
          :
          <div>
            <div>{this.host()}</div>
            <div>{this.join()}</div>
          </div>
        }
      </div>
    )
  }
}
