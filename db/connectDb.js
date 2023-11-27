const mongoose = require('mongoose');
const envConfig = require('../envConfig');

const connectDb = async () => {
  try {
    const dbConnection = await mongoose.connect(envConfig.dbUri, {
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
