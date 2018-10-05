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
})

router.get('/:id', (req, res) => {
  GameState.findById(req.params.id)
    .then(gameState => res.json(gameState))
});

router.put('/', (req, res) => {
  const newGameState = new GameState({
    _id: req.body._id,
    players: req.body.players,
    flop: req.body.flop,
    bet: req.body.bet,
    lastMove: req.body.lastMove,
    pot: req.body.pot,
    deck: req.body.deck,
    messages: req.body.messages
  });
  res.send("PUT request made")

  newGameState.save();
});

router.put('/:id', (req, res) => {
  GameState.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, model) {
    if (err){
      res.send(err)
    } else {
      res.json(model)
    }
  })
});

module.exports = router;
