require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const connectDb = require('./db/connectDb');

const PORT = process.env.PORT || 3000;

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
