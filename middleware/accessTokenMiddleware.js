// This middleware validates the user's access token and adds the user's ID to the request object.
const jwt = require('jsonwebtoken');

const accessTokenMiddleware = async (req, reply) => {
  try {
    await req.jwtVerify();
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    req.user = { id: decodedToken.id };
  } catch (err) {
    if (err.message === 'No Authorization was found in request.headers') {
      reply.code(401).send({ error: 'No access token provided' });
    } else if (err.message === 'Invalid token') {
      reply.code(401).send({ error: 'Invalid access token' });
    } else {
      console.error(err.message);
      reply
        .code(500)
        .send({ error: 'An error occurred during token verification', err: err.toString() });
    }
  }
};

module.exports = accessTokenMiddleware;
