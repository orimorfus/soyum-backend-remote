require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connectDb');
const morgan = require('morgan');
let chalk;
import('chalk').then(module => {
  chalk = module.default;
});

const PORT = process.env.PORT || 3000;

const server = express();
morgan.token('method', function getMethod(req) {
  return chalk.white(req.method);
});

morgan.token('url', function getUrl(req) {
  return chalk.blue(req.url);
});

morgan.token('colored-status', res => {
  const status = res.statusCode;
  let color = chalk.green;
  if (status >= 500) color = chalk.red;
  else if (status >= 400) color = chalk.yellow;
  else if (status >= 300) color = chalk.cyan;
  return color(status);
});

server.use(
  morgan(
    ':method | :url | status(:status) | content-length(:res[content-length]) | :response-time ms'
  )
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get('/heartbeat', (req, res) => {
  res.status(200).send('Server is working correctly');
});

async function startServer() {
  try {
    await connectDb();
    console.info('Mongo Connected Succesfully');

    server.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server running on port ${PORT}`);
  }
}

startServer();
