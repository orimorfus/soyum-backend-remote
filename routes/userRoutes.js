const { register, login } = require('../controllers/userController');

module.exports = (fastify, opts, done) => {
  fastify.post('/register', register);
  fastify.post('/login', login);
  done();
};
