const userService = require('../services/userService');

const getUsers = async (req, res, next) => {
  try {
    const { role } = req.params;
    const allUsersByRole = await userService.getUsers(role);
    return res.status(200).json(allUsersByRole);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const getAll = async (req, res, next) => {
  try {
    const allUsersByRole = await userService.getAll();
    return res.status(200).json(allUsersByRole);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = { getUsers, getAll };