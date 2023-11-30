const jwt = require('jsonwebtoken');
const { SECRET } = require('../../envConfig');

const generateAccessToken = (userId, expiresIn) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn });
};

module.exports = generateAccessToken;
