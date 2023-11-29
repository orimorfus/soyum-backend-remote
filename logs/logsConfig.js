const pino = require('pino');

const logger = {
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: label => {
      return { level: label.toUpperCase() };
    },
    bindings: bindings => {
      return {};
    },
  },
  redact: ['password', 'token', 'refreshToken'],
};

module.exports = logger;
