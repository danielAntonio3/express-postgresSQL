// ! Este tipo de conexión nos permite vitar abrir multiples conexiones a la base de datos, con pool el primer servicio que se ejecute es el que crea la conexión
const { Pool } = require('pg');

const {
  HOST_DB,
  NAME_DB,
  PASSWORD_DB,
  PORT_DB,
  USER_DB,
} = require('./../config/index');

const USER = encodeURIComponent(USER_DB);
const PASSWORD = encodeURIComponent(PASSWORD_DB);

const URI = `postgres://${USER}:${PASSWORD}@${HOST_DB}:${PORT_DB}/${NAME_DB}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
