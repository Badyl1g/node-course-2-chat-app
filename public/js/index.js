const socket = io();

socket.on('connect', () => {
  console.log('[Connected to server]');

  const newMessage = {
    to: 'Wojtek',
    text: 'Sure, lets go!'
  };
  socket.emit('createMessage', newMessage);
});

socket.on('disconnect', () => {
  console.log('[Disconnected from server]');
});

socket.on('newMessage', message => {
  console.log(`*New message from ${message.from}`);
  console.log(`-${message.text}`);
});