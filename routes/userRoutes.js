const { register, login, logout, deleteAccount } = require('../controllers/userController');
const verifyJWT = require('../middleware/authMiddleware');

module.exports = (fastify, opts, done) => {
  fastify.post('/register', register);
  fastify.post('/login', login);

  fastify.get('/logout', { preValidation: [verifyJWT] }, logout);
  fastify.get('/deleteaccount', { preValidation: [verifyJWT] }, deleteAccount);
  done();
};
