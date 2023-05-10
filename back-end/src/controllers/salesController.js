const saleService = require('../services/saleService');

const createSales = async (req, res, next) => {
  const { userId,
    sellerId, totalPrice, deliveryAddress, deliveryNumber, quantity, productId } = req.body;
  try {
    const sales = await saleService.createSales({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      quantity,
      productId,
    });
    return res.status(201).json(sales);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await saleService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const updateState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await saleService.updateState(req.body, id);
    return res.status(201).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = { createSales, updateState, getAll };