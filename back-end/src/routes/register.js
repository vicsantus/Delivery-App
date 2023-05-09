const express = require('express');
const { registerController } = require('../controllers');

const router = express.Router();

router.post('/register', registerController.createUser);

module.exports = router; 
