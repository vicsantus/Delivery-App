const crypto = require('crypto');
const { User } = require('../database/models/index');

const createUser = async (user) => {
  const { name, email, password, role } = user;
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw new Error('Email already registered');

  const senhaHash = crypto.createHash('md5').update(password).digest('hex');

  const result = await User.create({
    name,
    email,
    password: senhaHash,
    role: !role ? 'customer' : role,
  });
  return { id: result.null, name: result.name, email: result.email, role: result.role };
};

module.exports = { createUser };