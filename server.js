const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

const port = process.env.PORT || 5000;

//Bodyparser Middelware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('example_message', function(msg){
    console.log('message: ' + msg);
    io.sockets.emit('change');
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
app.use('/api/items', items);

//const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
