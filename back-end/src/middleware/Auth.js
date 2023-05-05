const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredinho';

const createToken = (data) => {
  const JWT_CONFIG = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };

  const token = jwt.sign({ data }, secret, JWT_CONFIG);
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = jwt.verify(authorization, secret);
    req.data = token.data;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};