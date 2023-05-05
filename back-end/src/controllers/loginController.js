const loginService = require('../services/loginService');
const { createToken } = require('../middleware/Auth');

const getByUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await loginService.getByUser(email, password);
    const token = createToken(user);
    return res.status(200).json({ ...user, token });
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
  // if (!user) return res.status(404).json({ message: 'Not found' });
};

module.exports = {
  getByUser,
};