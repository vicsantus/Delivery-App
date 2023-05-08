const express = require('express');
const { loginController, 
  registerController, 
  productsController, 
  salesController, 
  adminController } = require('../controllers');
const { verifyToken } = require('../middleware/Auth');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/sales', salesController.getAll);
router.post('/login', loginController.getByUser);
router.post('/register', registerController.createUser);
router.post('/sales', salesController.createSales); // requisito 20
router.post('/admin', verifyToken, adminController.createAdmin); // requisito 38

module.exports = router;