const { PORT, HOSTNAME } = require('../envConfig');
const { SwaggerTheme } = require('swagger-themes');

const theme = new SwaggerTheme('v3');
const content = theme.getBuffer('dark');

const registerSwaggerDocs = async fastify =>
  await fastify.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'SoYummy API',
        version: '0.1.0',
      },
      servers: [{ url: `https://${HOSTNAME}` }, { url: 'http://localhost:' + PORT }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });

const registerSwaggerUI = async fastify =>
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      layout: 'BaseLayout',
    },
    exposeRoute: true,
    theme: {
      css: [{ filename: 'theme.css', content: content }],
    },
    swagger: {
      openapi: '3.0.0',
    },
  });

module.exports = { registerSwaggerDocs, registerSwaggerUI };
