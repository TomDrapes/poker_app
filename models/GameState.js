const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Game State Schema
const GameStateSchema = new Schema({
  players: {
    type: Array,
    "default": []
  },
  deck: {
    type: Array,
    "default": []
  },
  flop: {
    type: Array,
    "default": []
  },
  bet: {
    type: Number,
  },
  lastMove: {
    type: String
  },
  pot: {
    type: Number
  }
});

module.exports = GameState = mongoose.model('player', GameStateSchema);
