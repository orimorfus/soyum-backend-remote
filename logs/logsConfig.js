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
  stream: require('pino').multistream([
    {
      stream: require('pino-pretty')({
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        messageFormat: '{msg} {req.method} {req.url}]',
      }),
    },
    {
      stream: require('rotating-file-stream').createStream('logs/logs.log', {
        size: '10M',
        compress: 'gzip',
        interval: '1d',
      }),
    },
  ]),
};

module.exports = logger;
