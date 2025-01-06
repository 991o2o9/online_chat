const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const route = require('./route');
const { addUser, findUser } = require('./user');

const app = express();
app.use(cors({ origin: '*' }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join', ({ name, room }) => {
    if (!name || !room) {
      return socket.emit('error', { message: 'Name and room are required.' });
    }

    try {
      const { user, isExist } = addUser({ name, room });
      socket.join(user.room);

      socket.emit('message', {
        user: { name: 'Admin' },
        message: `Привет, ${user.name}! Добро пожаловать в комнату ${user.room}.`,
      });

      if (!isExist) {
        socket.broadcast.to(user.room).emit('message', {
          user: { name: 'Admin' },
          message: `${user.name} присоединился к комнате.`,
        });
      }
    } catch (error) {
      console.error('Error in join event:', error.message);
      socket.emit('error', { message: 'Failed to join the room.' });
    }
  });

  socket.on('sendMessage', ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit('message', {
        user: { name: user.name },
        message: message,
      });
    } else {
      socket.emit('error', { message: 'User not found.' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
