const registerService = require('../services/registerService');

const createUser = async (req, res, next) => {
  try {
    await registerService.createUser(req.body);
    return res.status(201).json({ message: 'created' });
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = { createUser };