const saleService = require('../services/saleService');

const createSales = async (req, res, next) => {
  try {
    const sales = await saleService.createSales(req.body);
    return res.status(201).json(sales);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = { createSales };