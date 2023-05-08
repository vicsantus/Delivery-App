const adminService = require('../services/adminService');

const createAdmin = async (req, res, next) => {
  try {
    const result = await adminService.createAdmin(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = {
  createAdmin,
};