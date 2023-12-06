const jwt = require('jsonwebtoken');
const { User } = require('../models');

const accessTokenMiddleware = async (req, reply) => {
  try {
    await req.jwtVerify();
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    req.user = { id: decodedToken.id };

    const user = await User.findById(req.user.id);
    if (user) {
      user.expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;
      await user.save();
    }
  } catch (err) {
    if (err.message === 'No Authorization was found in request.headers') {
      reply.code(401).send({ message: 'No access token provided' });
    } else if (err.name === 'UnauthorizedError') {
      if (err.message.includes('expired')) {
        reply.code(401).send({ message: 'Token expired' });
      } else {
        reply.code(401).send({ message: 'Invalid access token' });
      }
    } else {
      console.error(err.name, err.message, err);
      reply
        .code(500)
        .send({ message: 'An error occurred during token verification', err: err.toString() });
    }
  }
};

module.exports = accessTokenMiddleware;
