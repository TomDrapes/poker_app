/* @flow */
import React, { Component } from 'react'
import Connection from './Connection'
import './style.css'

type Props = {
  name: string,
};

/* State = {
  players: Array<Player>,
  deck: Deck,
  flop: Array<Card>,
  playersTurn: number,
  chat: Array<Message>,
}

Player = {
  id: number,
  name: string,
  hand: Array<Card>,
  chipCount: number,
  connected: boolean,
}

Card = {
  value: number,
  suit: string,
  img: string,
}

Message = {
  id: number,
  time: Time,
  name: string,
  msg: string,
}

Time = {
  hour: number,
  minute: number,
}

Move = {
  id: number,
  move: string,
  bet?: number,
}

Deck = {
  img: string,
  cards: Array<Card>,
} */

export default class Header extends Component<Props> {
  render () {
    return (
      <div className="headerWrapper">
        <span>
          <div className="logo">Poker</div>
          <Connection name="John" status="connected"></Connection>
          <Connection name="Jerry" status="connected" />
        </span>
        <div className="clear" />
      </div>
    )
  }
}
