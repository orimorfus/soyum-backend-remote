// This middleware generates a unique device ID based on the user agent, screen resolution, and timezone, and adds it to the request object.
const crypto = require('crypto');
const { SECRET } = require('../envConfig');

const deviceIdMiddleware = async (req, reply) => {
  const userAgent = req.headers['user-agent'];
  const resolution = req.headers.resolution;
  const timezone = req.headers.timezone;

  const hash = crypto.createHmac('sha256', SECRET);
  hash.update(userAgent + resolution + timezone);
  req.deviceId = hash.digest('hex');
};

module.exports = deviceIdMiddleware;
