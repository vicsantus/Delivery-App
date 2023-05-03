const loginService = require('../services/loginService');

const getByUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.getByUser(email, password);

  if (!user) return res.status(404).json({ message: 'Not found' });
};

module.exports = {
  getByUser,
};