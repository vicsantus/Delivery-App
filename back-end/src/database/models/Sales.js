const { Model } = require('sequelize');

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'Sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATA,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, {
      foreignKey: { name: 'userId', field: 'user_id' },
      as: 'users',
    });
    Sales.belongsTo(models.Users, {
      foreignKey: { name: 'sellerId', field: 'seller_id' },
      as: 'users',
    });
  };

  return Sales;
};