const path = require('path');

const sendImages = async (req, res, next) => {
  const { img } = req.params;
  try {
    console.log(path.resolve(`images/${img}`));
    return res.sendFile(path.resolve(`images/${img}`));
  } catch (error) {
    next({ ...error, message: error.message, status: 409 });
  }
};

module.exports = {
  sendImages,
};