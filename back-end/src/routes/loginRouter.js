const express = require('express');
const { getByUser } = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', getByUser);

module.exports = loginRouter;