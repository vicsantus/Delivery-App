module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    },
  );

  Product.associate = (models) => {
    Product.hasMany(models.SalesProducts, {
      foreignKey: 'sale_id',
      as: 'saleId',
    });
  };

  return Product;
};