const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const gameState = require('./routes/api/gamestate');

const app = express();

const port = process.env.PORT || 5000;

//Bodyparser Middelware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('state_updated', function(playerId){
    console.log(`${playerId} updated game state`);
    io.sockets.emit('new_state_available');
  });
});
//io.listen(9000)
http.listen(9000);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/gamestate', gameState);

//const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
