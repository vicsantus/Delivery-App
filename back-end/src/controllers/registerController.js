const registerService = require('../services/registerService');

const createUser = async (req, res, next) => {
  try {
    const result = await registerService.createUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = { createUser };