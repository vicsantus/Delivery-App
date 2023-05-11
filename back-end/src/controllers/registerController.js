const registerService = require('../services/registerService');
const { createToken } = require('../middleware/Auth');

const createUser = async (req, res, next) => {
  try {
    const result = await registerService.createUser(req.body);
    return res.status(201).json({ ...result, token: createToken(result) });
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = { createUser };