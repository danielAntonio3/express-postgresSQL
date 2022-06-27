require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  ENV: process.env.ENV || 'dev',
  USER_DB: process.env.USER_DB,
  PORT_DB: process.env.PORT_DB,
  HOST_DB: process.env.HOST_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  NAME_DB: process.env.NAME_DB,
};

module.exports = config;
