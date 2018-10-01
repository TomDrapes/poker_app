const express = require('express');
const router = express.Router();

// Item Model
const Player = require('../../models/Player');

// @route GET api/player
// @desc GET All players
// @access Public
router.get('/', (req, res) => {
  Player.find()
    .sort({ date: -1 }) /* -1 descending +1 ascending */
    .then(players => res.json(players))
});

module.exports = router;
