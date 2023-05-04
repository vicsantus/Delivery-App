const express = require('express');
const { getByUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/login', getByUser);
router.post('/register');

module.exports = router;