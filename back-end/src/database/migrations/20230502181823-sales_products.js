"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_products", {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "sales",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "sale_id",
      },
      product_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "product_id",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("sales_products");
  },
};