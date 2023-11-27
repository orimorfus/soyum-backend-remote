const envConfig = {
  port: process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT,
  dbUri:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_URI
      : process.env.DEV_DATABASE_URI,
  secret: process.env.NODE_ENV === 'production' ? process.env.PROD_SECRET : process.env.DEV_SECRET,
  hostname:
    process.env.NODE_ENV === 'production' ? process.env.PROD_HOSTNAME : process.env.DEV_HOSTNAME,
};

module.exports = envConfig;
