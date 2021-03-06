const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('[New user connected]');

  const message = {
    from: 'Gabriel',
    text: 'Wanna go to the cinema?',
    createdAt: '123'
  };
  socket.emit('newMessage', message);

  socket.on('createMessage', newMessage => {
    console.log('*New message created', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('[User disconnected]');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});