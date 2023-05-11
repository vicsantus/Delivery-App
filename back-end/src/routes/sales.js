const express = require('express');
const { salesController } = require('../controllers');
const { verifyToken } = require('../middleware/Auth');

const router = express.Router();

router.get('/', salesController.getAll);
router.post('/', verifyToken, salesController.createSales); // requisito 20
router.put('/:id', salesController.updateState);
router.get('/orderUser/:userId', salesController.getbyUserId);

module.exports = router; 
