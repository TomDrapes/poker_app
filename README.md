# Poker App
by Tom Drapes

![screen](https://github.com/doctorApes/poker_app/blob/master/client/src/Screenshots/Screen%20Shot%202018-10-07%20at%2012.40.04%20pm.png)

## About

This app is based on classic Texas Hold'em Poker and is made for two players.<br/>
Built using the MERN stack this application also uses Redux, React-router, D3.js and socket.io

## What is completed.
* Design and layout
* Game state
* Basic game flow
* Server backend using Express.js and socket.io
* Chat
* Algorithms to check player hands
* MongoDB database integration
* D3.js Statistics page (localhost:3000/stats)

## What still needs to be done
* Replace hardcoded styles with responsive designs
* Handle end game when player runs out of chips ie => end game / reset game
* Test for edge cases
* Flow integration for stricter type specifications

## Current Problems
* Flow integration. Not necessary but desirable.
* CSS needs to better thought out. (Update: have fixed main issues but still need to create responsive layout)
* Also small bug where amounts player needs to call is wrong. Eg. player bets $10 then oppponent raises to $20, the player who bet $10 should only need to put in another $10 to call but currently it requires them to place a $20 bet to call. Simply requires keeping track of total amount each player has bet each round and making sure they are equal to call. (Currently fixing)

## How to run
* Create mongoDB database <br/>
$ mongo <br/>
$ use poker_app
* In poker_app/config/keys.js change mongoURI: "mongodb://poker_admin:poker1234@ds115472.mlab.com:15472/poker_app" to mongoURI: "mongodb://127.0.0.1:27017"
* In poker_app/client/index.js make sure that window.devToolsExtension && window.devToolsExtension() is commented out.
* From inside poker_app directory run: npm run dev
* Once game is open in browser either start new game, join existing game or view stats at localhost:3000/stats

## Attributes
Vectors by <a href="https://www.Vecteezy.com">www.vecteezy.com</a>
