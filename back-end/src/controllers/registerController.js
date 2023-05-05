const registerService = require('../services/registerService');

const createUser = async (req, res, next) => {
  try {
    await registerService.createUser(req.body);
    return res.sendStatus(201);
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = { createUser };