require('dotenv').config();
const logger = require('./logs/logsConfig.js');

const fastify = require('fastify')({
  logger: logger,
});

fastify.log.on('error', err => {
  console.error('Error while writing to log file:', err);
});

const connectDb = require('./db/connectDb');
const userRoutes = require('./routes/userRoutes');
const { port, secret, hostname } = require('./envConfig');

fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'SoYummy',
      version: '1.0.0',
    },
    host: `${hostname}:${port}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'key',
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

fastify.register(require('@fastify/jwt'), { secret: secret });
fastify.register(userRoutes, { prefix: '/api/user' });

fastify.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

async function startServer() {
  try {
    await connectDb();
    await fastify.listen({ port: port });
  } catch (error) {
    console.error(`something went wrong`, error);
  }
}

startServer();
