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

fastify.register(userRoutes, { prefix: '/api/user' });

fastify.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: `Sorry, this route does not exist, to see all available routes visit ${HOSTNAME}:${PORT}/docs`,
  });
});

fastify.setErrorHandler(function (error, request, reply) {
  if (error.code && error.code === 'FST_ERR_VALIDATION') {
    const property = error.validation[0].schemaPath.split('/')[2];
    const message = `${property} ${error.validation[0].message}`;
    reply.status(error.statusCode).send({
      message: message,
    });
  } else {
    reply.status(error.statusCode).send({
      message: 'something went wrong',
    });
    console.error(error);
  }
});

const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;
async function startServer() {
  try {
    await connectDb();
    await fastify.listen({ host: host, port: PORT });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
