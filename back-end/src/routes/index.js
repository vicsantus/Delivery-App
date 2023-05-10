const express = require('express');
const adminRuter = require('./admin');
const imageRouter = require('./image');
const loginRouter = require('./login');
const productsRouter = require('./products');
const registerRouter = require('./register');
const salesRouter = require('./sales');
const usersRouter = require('./users');
const errorMiddleware = require('../middleware/ErrorMiddleware');

const router = express();

router.use('/admin', adminRuter);
router.use('/images', imageRouter);
router.use('/login', loginRouter);
router.use('/products', productsRouter);
router.use('/register', registerRouter);
router.use('/sales', salesRouter);
router.use('/users', usersRouter);
router.use(errorMiddleware);

module.exports = router;