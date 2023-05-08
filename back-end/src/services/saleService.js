const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const { Sales, SalesProducts } = require('../database/models/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config[env]);

const createSales = async (saleBody) => {
  const t = await sequelize.transaction();
  try {
    const sale = await Sales.create({
      ...saleBody,
      saleDate: Date.now(),
      status: 'Pendente',
    }, { transaction: t });
    await SalesProducts.create({
      saleId: sale.id,
      quantity: saleBody.quantity,
      productId: saleBody.productId,
    }, { transaction: t });
    await t.commit();
    return sale;
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const getAll = async () => {
  const result = await Sales.findAll({
    include: [
      { model: SalesProducts,
        as: 'salesPId',
      },
    ],
  });
  return result;
};

module.exports = { createSales, getAll };