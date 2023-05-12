const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const { Sales, SalesProducts, Product } = require('../database/models/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config[env]);

const getById = async (id) => {
  const result = await Sales.findOne(
    {
    where: { id },
    include: [
      { model: SalesProducts,
        as: 'salesPId',
        include: [{
          model: Product,
          as: 'SaleProductsProductId',
        }],
      },
    ],
  },
  ); 
  if (!result) throw new Error('Non-existent id'); 
  return result;
};

const createSales = async (saleBody) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = saleBody;
  const newBody = { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber };
  const t = await sequelize.transaction();
  try {
    const sale = await Sales.create({ ...newBody,
    saleDate: Date.now(),
      status: 'Pendente',
    }, { transaction: t });
    await Promise.all(products.map((product) => SalesProducts.create({ saleId: sale.id,
        quantity: product.quantity,
        productId: product.id,
      }, { transaction: t })));
    await t.commit();
    return sale.id;
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

const getbyUserId = async (userId) => {
  const result = await Sales.findAll({ where: { userId } });
  if (result.length === 0) throw new Error('User without orders');
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

module.exports = { updateState, createSales, getbyUserId, getAll, getById };
