// const bcrypt = require('bcryptjs');
// const md5 = require('md5');
// const crypto = require('crypto');
const { User } = require('../database/models/index');

const getByUser = async (email, _password) => {
  const result = await User.findOne({ where: { email } });
  // const senhaHash = crypto.createHash('md5').update(password).digest('hex');

  console.log(result);
  // console.log(result.password, password);
  // if (senhaHash === result.password) {
  //   console.log('-----------------A senha está correta!');
  // } else {
  //   console.log('-----------------A senha está incorreta.');
  // }
  // if (!result || !bcrypt.compareSync(password, result.password)) {
  //   throw new Error('Password/Email not found');
  // }
};

module.exports = {
  getByUser,
};