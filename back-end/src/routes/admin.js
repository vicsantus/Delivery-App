const express = require('express');
const { verifyToken } = require('../middleware/Auth');
const { adminController } = require('../controllers');

const router = express.Router();

router.post('/', verifyToken, adminController.createAdmin); // requisito 38

module.exports = router; 
