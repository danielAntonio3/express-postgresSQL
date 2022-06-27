const { Sequelize } = require('sequelize');
const {
  HOST_DB,
  NAME_DB,
  PASSWORD_DB,
  PORT_DB,
  USER_DB,
} = require('./../config/index');

// Archivo que tiene todos los modelos
const setupModels = require('./../models/index');

const USER = encodeURIComponent(USER_DB);
const PASSWORD = encodeURIComponent(PASSWORD_DB);

const URI = `postgres://${USER}:${PASSWORD}@${HOST_DB}:${PORT_DB}/${NAME_DB}`;

// Configuración de base de datos
const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: true });

setupModels(sequelize);

// Sincronizar los modelos (Crear tablas)
sequelize.sync();

module.exports = sequelize;
