const { User } = require('../database/models/index');
const passwordHash = require('../utils/passwordHash');

const createAdmin = async (user) => {
  const { name, email, password, role } = user;
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw new Error('Email already registered');

  const senhaHash = passwordHash(password);

  const result = await User.create({ name, email, password: senhaHash, role });

  return { id: result.null, name: result.name, email: result.email, role: result.role };
};

module.exports = {
  createAdmin,
};