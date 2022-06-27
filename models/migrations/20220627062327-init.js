'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('./../category.model');
const { USER_TABLE, UserSchema } = require('./../user.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../product.model');

module.exports = {
  // ! Esto crea las base
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },
  //  ! Para revertir cambios rollback
  async down(queryInterface) {
    await queryInterface.drop(CATEGORY_TABLE);
    await queryInterface.drop(USER_TABLE);
    await queryInterface.drop(PRODUCT_TABLE);
  },
};
