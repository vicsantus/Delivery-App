const express = require('express');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/', loginController.getByUser);

module.exports = router; 
