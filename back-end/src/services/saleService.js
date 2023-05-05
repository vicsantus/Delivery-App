/* eslint-disable max-lines-per-function */
const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const { Sales, SalesProducts } = require('../database/models/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config[env]);

const createSales = async (saleBody) => {
  const { userId,
    sellerId, totalPrice, deliveryAddress, deliveryNumber, status, productId, quantity } = saleBody;
  const t = await sequelize.transaction();
  let sale;
  try {
    sale = await Sales.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: Date.now(),
      status,
    }, { transaction: t });
    await SalesProducts.create({
      saleId: sale.id,
      quantity,
      productId,
    }, { transaction: t });
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
  return sale;
};

module.exports = { createSales };