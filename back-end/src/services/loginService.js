const crypto = require('crypto');
const { User } = require('../database/models/index');

const getByUser = async (email, password) => {
  const result = await User.findOne({ where: { email } });
  const senhaHash = crypto.createHash('md5').update(password).digest('hex');

  const { password: _, ...user } = result.dataValues; 
  if (senhaHash === result.password) {
    return user;
  } 
    throw new Error('Password/Email not found');
};

module.exports = {
  getByUser,
};