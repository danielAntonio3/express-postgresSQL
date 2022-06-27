const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  price: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  isBlock: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Product extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timesTamps: false,
    };
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product,
};
