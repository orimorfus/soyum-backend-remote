require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const connectDb = require('./db/connectDb');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;

fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET });
fastify.register(userRoutes, { prefix: '/api/user' });

fastify.get('/heartbeat', (req, res) => {
  res.code(200).send('Server is working correctly');
});

async function startServer() {
  try {
    await connectDb();
    fastify.listen({ port: PORT });
  } catch (error) {
    console.error(`Server running on port ${PORT}`);
  }
}

startServer();
