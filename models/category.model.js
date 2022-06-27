const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'Categories';

const CategorySchema = {
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
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timesTamps: false,
    };
  }
}

module.exports = {
  CATEGORY_TABLE,
  CategorySchema,
  Category,
};
