const jwt = require('jsonwebtoken');

const { SECRET } = require('../../envConfig');
const generateRefreshToken = (userId, userAgent, expiresIn) => {
  const payload = {
    userId,
    userAgent,
  };
  return jwt.sign(payload, SECRET, { expiresIn });
};

module.exports = generateRefreshToken;
