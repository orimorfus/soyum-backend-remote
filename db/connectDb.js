const mongoose = require('mongoose');
const { DB_URI } = require('../envConfig');

const connectDb = async () => {
  try {
    const dbConnection = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${dbConnection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
