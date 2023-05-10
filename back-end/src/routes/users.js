const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:role', usersController.getUsers);
router.delete('/:id', usersController.deleteUser);

module.exports = router; 
