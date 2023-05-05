const { Product } = require('../database/models/index');

const getAllProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

module.exports = { getAllProducts };