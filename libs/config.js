// ! NOTA: Este archivo debe estar a la misma altura que el de la conexión a la base de datos
const {
  HOST_DB,
  NAME_DB,
  PASSWORD_DB,
  PORT_DB,
  USER_DB,
} = require('../config/index');

const USER = encodeURIComponent(USER_DB);
const PASSWORD = encodeURIComponent(PASSWORD_DB);

const URI = `postgres://${USER}:${PASSWORD}@${HOST_DB}:${PORT_DB}/${NAME_DB}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
