const { User } = require('../database/models/index');

const getUsers = async (role) => {
  const userByRole = await User.findAll({ where: { role }, attributes: { exclude: ['password'] } });

  if (!userByRole) throw new Error('User not existing.');
  return userByRole;
};

module.exports = { getUsers };