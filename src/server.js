import path from 'path';
import http from 'http';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Set static folder (to have the 'public' folder as static folder so we can access to html inside it)
app.use(express.static(path.join(__dirname, '../public')));

// Run when client connects
io.on('connection', socket => {
  let currentUsername = '';
  
  console.log('New WS Connection...');
  socket.on('connected', (username) => {
    currentUsername = username
    const message = `${currentUsername} has just connected`;
    // io.emit('messages', { username: 'Server', message })
    socket.broadcast.emit('messages', { username: 'Server', message })
  });

  socket.on('message', (username, message) => {
    io.emit('messages', { username, message })
  });

  socket.on('disconnect', () => {
    const message = `${currentUsername} has left the room`;
    io.emit('messages', { username: 'Server', message });
  });
});

const PORT = 4000  || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});
