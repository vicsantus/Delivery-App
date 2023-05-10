const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.getAll);
router.post('/', salesController.createSales); // requisito 20
router.put('/:id', salesController.updateState);
router.get('/orderUser/:userId', salesController.getbyUserId);

module.exports = router; 
