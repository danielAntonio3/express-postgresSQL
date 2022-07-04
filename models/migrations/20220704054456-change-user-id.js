('use strict');
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../customer.model');

module.exports = {
  // ! Ejemplo de como alterar un campo
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true, // ! Este campo se agrego al modelo
    });
  },

  async down(queryInterface) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
