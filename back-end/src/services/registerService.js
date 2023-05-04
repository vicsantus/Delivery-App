const crypto = require('crypto');
const { User } = require('../database/models/index');

const createUser = async (user) => {
  const { name, email, password, role } = user;
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw new Error('Email already registered');

  const senhaHash = crypto.createHash('md5').update(password).digest('hex');

  await User.create({ name, email, password: senhaHash, role });
};

module.exports = { createUser };