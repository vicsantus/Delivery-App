const { Model } = require('sequelize');

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataType} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  const SaleProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    },
  );

  SaleProducts.associate = (models) => {
    SaleProducts.belongsTo(models.Sales, {
      foreignKey: { name: 'saleId', field: 'sale_id' },
      as: 'SaleProductsSaleId',
    });
    SaleProducts.belongsTo(models.Sales, {
      foreignKey: { name: 'productId', field: 'product_id' },
      as: 'SaleProductsProductId',
    });
  };

  return SaleProducts;
};