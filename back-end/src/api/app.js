const express = require('express');
const router = require('../routes');
const errorMiddleware = require('../middleware/ErrorMiddleware');

const app = express();

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(router);
app.use(errorMiddleware);

module.exports = app;
