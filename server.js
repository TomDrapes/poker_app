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
let clients = [];
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('state_updated', function(){
    console.log('Game state updated');
    socket.broadcast.emit('new_state_available')
  });

  socket.on('game_created', function(){
    console.log('Starting new game...')
    io.sockets.emit('new_state_available')
  })

  socket.on('new_message', function(){
    socket.broadcast.emit('new_msg_available')
  })

  socket.on('message_pending', function(){
    socket.broadcast.emit('message_pending')
  })
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

app.listen(port, () => console.log(`Server started on port ${port}`));
