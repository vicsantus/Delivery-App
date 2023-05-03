module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Sales, {
      foreignKey: 'user_id',
      as: 'userId',
    }, {
      foreignKey: 'seller_id',
      as: 'sellerId',
    });
  };

  return User;
};