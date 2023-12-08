require('dotenv').config();
const connectDb = require('./db/connectDb.js');
const userRoutes = require('./routes/userRoutes');
const { PORT, SECRET, HOSTNAME } = require('./envConfig');
const logger = require('./logs/logsConfig.js');
const { registerSwaggerDocs, registerSwaggerUI } = require('./docs/swaggerSettings');

const fastify = require('fastify')({
  logger: logger,
});

fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(require('@fastify/jwt'), { secret: SECRET });

registerSwaggerDocs(fastify);
registerSwaggerUI(fastify);

fastify.register(userRoutes, { prefix: '/user' });

fastify.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: `Sorry, this route does not exist, to see all available routes visit ${HOSTNAME}:${PORT}/docs`,
  });
});

fastify.setErrorHandler(function (error, request, reply) {
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
    await fastify.listen({ host: host, port: PORT, prefix: '/api' });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
