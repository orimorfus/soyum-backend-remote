require('dotenv').config();
const connectDb = require('./db/connectDb.js');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const { PORT, SECRET, HOSTNAME } = require('./envConfig');
const { registerSwaggerDocs, registerSwaggerUI } = require('./docs/swaggerSettings');

const server = require('fastify')({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

server.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});
server.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute',
});
server.register(require('@fastify/jwt'), { secret: SECRET });

registerSwaggerDocs(server);
registerSwaggerUI(server);

server.register(userRoutes, { prefix: '/api/user' });
server.register(recipeRoutes, { prefix: '/api/recipe' });
server.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

server.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: `Sorry, this route does not exist, to see all available routes visit ${HOSTNAME}:${PORT}/docs`,
  });
});

server.setErrorHandler(function (error, request, reply) {
  if (error.statusCode === 429) {
    reply.code(429);
    error.message = 'You hit the rate limit! Slow down please!';
  }
  reply.send(error);
});
server.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    const validationErrors = error.validation.map(
      err => `${err.dataPath || 'Value'} ${err.message}`
    );
    reply.status(400).send({
      error: 'Bad Request',
      message: error.message,
      validation: validationErrors,
    });
  } else if (error.statusCode === 400) {
    reply.status(400).send({
      error: 'Bad Request',
      message: error.message,
    });
  } else {
    console.error(error);
    reply.status(error.statusCode || 500).send({
      error: error.name,
      message: error.message,
    });
  }
});

const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;
async function startServer() {
  try {
    await connectDb();
    await server.listen({ host: host, port: PORT });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
