const express = require('express');
const { getByUser } = require('../controllers/loginController');
const { createUser } = require('../controllers/registerController');
const { getAllProducts } = require('../controllers/productsController');

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/login', getByUser);
router.post('/register', createUser);

module.exports = router;