const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

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
  description: {
    allowNull: true,
    type: DataTypes.STRING,
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
  categoryId: {
    field: 'category_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  // Indicando que product puede tener una categoría
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product,
};
