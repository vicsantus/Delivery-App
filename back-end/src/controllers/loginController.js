const loginService = require('../services/loginService');

const getByUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService.getByUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ menssagem: 'Password/Email not found' });
  }
  // if (!user) return res.status(404).json({ message: 'Not found' });
};

module.exports = {
  getByUser,
};