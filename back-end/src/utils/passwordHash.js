const crypto = require('crypto');

const passwordHash = (password) => crypto.createHash('md5').update(password).digest('hex');

module.exports = passwordHash;