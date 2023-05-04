const express = require('express');
const { getByUser } = require('../controllers/loginController');
const { createUser } = require('../controllers/registerController');

const router = express.Router();

router.post('/login', getByUser);
router.post('/register', createUser);

module.exports = router;