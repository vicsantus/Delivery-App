const express = require('express');
const cors = require('cors');
const { 
adminRuter, 
imageRouter, 
loginRouter, 
productsRouter, 
registerRouter, 
salesRouter,
} = require('../routes');
const errorMiddleware = require('../middleware/ErrorMiddleware');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/admin', adminRuter);
app.use('/images', imageRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/register', registerRouter);
app.use('/sales', salesRouter);
app.use(errorMiddleware);

module.exports = app;
