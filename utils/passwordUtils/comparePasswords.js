const bcrypt = require('bcryptjs');

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = comparePasswords;
