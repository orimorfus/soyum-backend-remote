const envConfig = {
  PORT: process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT,
  DB_URI:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_URI
      : process.env.DEV_DATABASE_URI,
  SECRET: process.env.NODE_ENV === 'production' ? process.env.PROD_SECRET : process.env.DEV_SECRET,
  HOSTNAME:
    process.env.NODE_ENV === 'production' ? process.env.PROD_HOSTNAME : process.env.DEV_HOSTNAME,
};

module.exports = envConfig;
