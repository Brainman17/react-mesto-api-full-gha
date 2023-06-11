/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/customErrors');
const { key } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.replace('Bearer ', '');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
// eb28131ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b
