const { User } = require('../database/models/index');

const getUsers = async (role) => {
  const userByRole = await User.findAll({ where: { role }, attributes: { exclude: ['password'] } });

  if (!userByRole) throw new Error('User not existing.');
  return userByRole;
};

const getAll = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const deleteUser = async (id) => {
  const userExists = await User.findByPk(id);
  if (!userExists) throw new Error('User not existing.');

  await User.destroy({ where: { id } });
};

module.exports = { getUsers, getAll, deleteUser };
