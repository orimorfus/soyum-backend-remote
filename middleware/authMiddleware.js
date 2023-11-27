const verifyJWT = async (req, reply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};

module.exports = verifyJWT;
