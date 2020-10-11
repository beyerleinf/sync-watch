import * as express from 'express';
import * as SocketIO from 'socket.io';
import * as http from 'http';
import {generate as shortid} from 'shortid';
import roomRoutes from './routes/room.routes';
import {Room} from './models/room';

const PORT = process.env.PORT || 9999;

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

const rooms: Room[] = [];

io.on('connect', client => {});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SyncWatch!');
});

app.post('/room', (req, res) => {
  const id = shortid();
  rooms.push({id});
  res.json({id});
});

// app.use(roomRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
