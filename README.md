# Poker App
by Tom Drapes

![screen](https://github.com/doctorApes/poker_app/blob/master/src/Screenshots/screenshot_1.png)

## About

This app is based on classic Texas Hold'em Poker and is made for two players.
Built with React/Redux.

## What is completed.
* Rough design and layout
* Game state
* Basic game flow
* Initial chat
* Algorithms to check player hands

## What still needs to be done
* Style needs to be better developed eg. replace hardcoded styles with responsive designs
* Algorithm bug testing
* Finalize game flow eg. Show hands => determine winner => distribute chips => reset state => reshuffle => deal
* Client/Host networking
* Back-end stuff eg. db's and d3.js integration
* Flow integration for stricter type specifications



## Current Problems
* Flow integration. Not necessary but desirable.
* CSS needs to better thought out.
* Bugs in algorithms to determine player hands. Eg found a bug where if a player has two pair but also has a straight it
doesn't return the player as having a straight but rather just two pair. Obviously it needs to return the best hand the player
can make.
* Also small bug where amounts player needs to call is wrong. Eg. player bets $10 then oppponent raises to $20, the player who bet $10 should only need to put in another $10 to call but currently it requires them to place a $20 bet to call. Simply requires keeping track of total amount each player has bet each round and making sure they are equal to call.

## Attributes
Vectors by <a href="https://www.Vecteezy.com">www.vecteezy.com</a>
