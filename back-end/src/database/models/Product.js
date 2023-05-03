module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  });
  Product.associate = (models) => {
    Product.hasMany(models.SalesProducts, {
      foreignKey: 'sale_id',
      as: 'saleId',
    });
  };
  return Product;
};