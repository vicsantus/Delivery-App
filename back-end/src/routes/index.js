const express = require('express');
const { getByUser } = require('../controllers/loginController');
const { createUser } = require('../controllers/registerController');
const { getAllProducts } = require('../controllers/productsController');
const { createSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/login', getByUser);
router.post('/register', createUser);
router.post('/sales', createSales); // requisito 20

module.exports = router;