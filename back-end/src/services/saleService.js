const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const { Sales, SalesProducts, Product } = require('../database/models/index');
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
        include: [{
          model: Product,
          as: 'SaleProductsProductId',
        }],
      },
    ],
  });
  return result;
};

const getById = async (id) => {
  const result = await Sales.findByPk(id);
  return result;
};

const getbyUserId = async (userId) => {
  const result = await Sales.findAll({ where: { userId } });
  if (result === []) throw new Error('User without orders');
  return result; 
};

const updateState = async (body, id) => {
  const { status } = body;
  const checkSale = await getById(id);
  if (!checkSale) throw new Error('Non-existent id'); 
  await Sales.update(
    { status },
    { where: { id } },
  );

  const allSales = await Sales.findByPk(id, { include: [
    { model: SalesProducts,
      as: 'salesPId',
      include: [{
        model: Product,
        as: 'SaleProductsProductId',
      }],
    },
  ] });
  
  return allSales;
};

module.exports = { updateState, createSales, getbyUserId, getAll };
