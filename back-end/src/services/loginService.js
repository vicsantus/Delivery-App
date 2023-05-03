const { User } = require('../database/models');

const getByUser = async (email, password) => User.findOne({ where: { email, password } });

module.exports = {
  getByUser,
};