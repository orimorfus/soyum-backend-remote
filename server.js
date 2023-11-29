require('dotenv').config();
const connectDb = require('./db/connectDb.js');
const cors = require('@fastify/cors');
const userRoutes = require('./routes/userRoutes');
const { PORT, SECRET, HOSTNAME } = require('./envConfig');
const logger = require('./logs/logsConfig.js');

const fastify = require('fastify')({
  logger: logger,
});

fastify.register(cors);

fastify.log.on('error', err => {
  console.error('Error while writing to log file:', err);
});

fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'SoYummy',
      version: '1.0.0',
    },
    host: process.env.NODE_ENV === 'production' ? HOSTNAME : `${HOSTNAME}:${PORT}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your JWT here:',
      },
    },
    security: [{ Bearer: [] }],
  },
  exposeRoute: true,
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.register(require('@fastify/jwt'), { secret: SECRET });
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
  if (error.name === 'ValidationError') {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
    });
  } else {
    reply.send(error);
  }
});

async function startServer() {
  try {
    await connectDb();
    await fastify.listen({ port: PORT });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
