'use strict';

// const { USER_TABLE, UserSchema } = require('./../user.model');

module.exports = {
  async up(queryInterface) {
    // ! Como agregar un campo a una tabla (alter table)
    // await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down(queryInterface) {
    // await queryInterface.removeColumn(USER_TABLE, 'role', UserSchema.role);
  },
};
