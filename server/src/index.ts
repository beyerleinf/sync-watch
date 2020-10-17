import * as express from 'express';
import * as SocketIO from 'socket.io';
import * as http from 'http';
import {generate as shortid} from 'shortid';
// import roomRoutes from './routes/room.routes';
import {Room} from './models/room';
import * as cors from 'cors';
import {UserRole} from './models';

const PORT = process.env.PORT || 9999;

const app = express();
const server = http.createServer(app);
const io = SocketIO(server, {
  // handlePreflightRequest: (req, res) => {
  //   console.log('handlePreflightRequest');
  //   const headers = {
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true,
  //   };
  //   res.writeHead(200, headers);
  //   res.end();
  // },
});

const rooms: {[key: string]: Room} = {};

io.on('connect', client => {
  const userId = client.client.id;
  let currentRoom = '';
  console.log('io::connect', userId);

  client.on('joinRoom', data => {
    currentRoom = data.id;
    const name = data.name;
    console.log('io::joinRoom =>', currentRoom, name);

    if (rooms[currentRoom]) {
      if (rooms[currentRoom].users.length === 0 || !rooms[currentRoom].roomMaster) {
        rooms[currentRoom].roomMaster = userId;
      }

      rooms[currentRoom].users.push({id: userId, username: name, role: UserRole.user});
      client.join(`room:${currentRoom}`);
      io.to(`room:${currentRoom}`).emit('users', rooms[currentRoom].users);
    }
  });

  client.on('setVideo', data => {
    // const roomId = data.id;
    const videoId = data.videoId;
    console.log('io::setVdeo =>', currentRoom, videoId);

    rooms[currentRoom].currentVideo = videoId;
    io.to(`room:${currentRoom}`).emit('currentVideo', rooms[currentRoom].currentVideo);
  });

  client.on('playVideo', data => {
    // const roomId = data.id;

    io.to(`room:${currentRoom}`).emit('playVideo');
  });

  client.on('pauseVideo', data => {
    // const roomId = data.id;

    io.to(`room:${currentRoom}`).emit('pauseVideo');
  });

  client.on('videoSync', data => {
    // const roomId = data.id;
    const time = data.time;

    if (rooms[currentRoom].roomMaster === userId) {
      io.to(`room:${currentRoom}`).emit('videoSync', {time});
    }
  });

  client.on('disconnect', () => {
    console.log('io::disconnect', userId);

    if (currentRoom) {
      const userIndex = rooms[currentRoom].users.findIndex(u => u.id === userId);
      rooms[currentRoom].users.splice(userIndex, 1);

      if (rooms[currentRoom].roomMaster === userId) {
        if (rooms[currentRoom].users.length > 0) {
          rooms[currentRoom].roomMaster = rooms[currentRoom].users[0].id;
        } else {
          delete rooms[currentRoom];
        }
      }
    }
  });
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SyncWatch!');
});

app.post('/rooms', (req, res) => {
  const id = shortid();
  console.log('createRoom =>', id);

  rooms[id] = {id, exists: true, users: [], roomMaster: ''};
  res.json({id});
});

app.get('/rooms/:id', (req, res) => {
  const room = rooms[req.params.id];

  if (room) {
    res.json({id: room.id, exists: room.exists});
  } else {
    res.status(404).json({exists: false});
  }
});

// app.use(roomRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
