/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;

const {
  ERROR_BAD_REQUEST,
  ERROR_SERVER,
  ERROR_CONFLICT,
} = require('../utils/constants');

const {
  ForbiddenError,
} = require('../errors/ForbiddenError');

const {
  NotFoundError,
} = require('../errors/NotFoundError');

const {
  UnauthorizedError,
} = require('../errors/UnauthorizedError');

function centralErrorHandler(err, req, res, next) {
  if (err.code === 11000) {
    return res
      .status(ERROR_CONFLICT)
      .send({ message: 'Пользователь с такой почтой уже существует' });
  }
  if (
    err instanceof NotFoundError
    || err instanceof UnauthorizedError
    || err instanceof ForbiddenError
  ) {
    const message = err;
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(ERROR_BAD_REQUEST)
      .send({ message: 'Некорректные данные' });
  }
  return res.status(ERROR_SERVER).send(err.message);
}

module.exports = centralErrorHandler;
