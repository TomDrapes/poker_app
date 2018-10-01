const express = require('express');
const router = express.Router();

// Game State Model
const GameState = require('../../models/GameState');

// @route GET api/game_state
// @desc GET All game_state
// @access Public
router.get('/', (req, res) => {
  GameState.find()
    .then(gameState => res.json(gameState))
});

router.put('/', (req, res) => {
  const newGameState = new GameState({
    _id: req.body._id,
    players: req.body.players
  });

  newGameState.save();
});

module.exports = router;
