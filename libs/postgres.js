const { Client } = require('pg');
const {
  HOST_DB,
  NAME_DB,
  PASSWORD_DB,
  PORT_DB,
  USER_DB,
} = require('./../config/index');

async function getConnection() {
  const client = new Client({
    host: HOST_DB,
    port: PORT_DB,
    user: USER_DB,
    password: PASSWORD_DB,
    database: NAME_DB,
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
