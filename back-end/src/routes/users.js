const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:role', usersController.getUsers);

module.exports = router; 
