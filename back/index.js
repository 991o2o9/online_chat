require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const Message = require('./models/messages');

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const activeRooms = {};
const userRoomMapping = {};

const updateUserCount = (room) => {
  const userCount = activeRooms[room] || 0;
  io.to(room).emit('roomData', { room, userCount });
};

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join', async ({ name, room }) => {
    if (!name || !room) {
      return socket.emit('error', { message: 'Name and room are required.' });
    }

    if (!activeRooms[room]) {
      activeRooms[room] = 0;
    }

    activeRooms[room]++;
    userRoomMapping[socket.id] = room;
    socket.join(room);

    updateUserCount(room);

    try {
      const messages = await Message.find({ room }).sort({ createdAt: 1 });
      console.log('Sending previous messages:', messages);
      socket.emit('previousMessages', messages);
    } catch (err) {
      console.error('Error loading messages:', err);
    }

    console.log(`Sending welcome message to ${name}`);
    socket.emit('message', {
      user: { name: 'Admin' },
      message: `Добро пожаловать, ${name}!`,
    });

    socket.broadcast.to(room).emit('message', {
      user: { name: 'Admin' },
      message: `${name} присоединился.`,
    });
  });

  socket.on('sendMessage', async ({ message, params }) => {
    const { name, room } = params;
    console.log('Received message:', message);

    try {
      const newMessage = new Message({
        room,
        user: name,
        message,
      });

      await newMessage.save();
      console.log('Message saved:', newMessage);

      io.to(room).emit('message', { user: { name }, message });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to send message.' });
    }
  });

  socket.on('disconnect', async () => {
    const room = userRoomMapping[socket.id];

    if (room) {
      if (activeRooms[room]) activeRooms[room]--;

      if (activeRooms[room] === 0) {
        try {
          await Message.deleteMany({ room });
          delete activeRooms[room];
          console.log(`Room ${room} cleared and removed.`);
        } catch (error) {
          console.error(`Failed to clear room ${room}:`, error);
        }
      } else {
        updateUserCount(room);
      }

      delete userRoomMapping[socket.id];
    }
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
