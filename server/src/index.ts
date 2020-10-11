import * as express from 'express';
import * as http from 'http';

const PORT = process.env.PORT || 9999;

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SyncWatch!');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
