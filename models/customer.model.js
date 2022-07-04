const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'Customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Customer extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timesTamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer,
};
