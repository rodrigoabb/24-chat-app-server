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
  console.log('New WS Connection...');
  socket.on('connected', () => {
    console.log('A user has connected');
  })
})

const PORT = 4000  || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});
