const express = require('express');
const { registerController } = require('../controllers');

const router = express.Router();

router.post('/', registerController.createUser);

module.exports = router; 
