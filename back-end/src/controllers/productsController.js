const productsService = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const allProducts = await productsService.getAllProducts();
    return res.status(200).json(allProducts);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = { getAllProducts };