const mongoose = require("mongoose");
const { CastError, ValidationError } = mongoose.Error;

const {
  ERROR_BAD_REQUEST,
  ERROR_SERVER,
  ERROR_CONFLICT,
} = require("../utils/constants");

const {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors/customErrors");

function centralErrorHandler(err, res, next) {
  if (err.code === 11000) {
    return res
      .status(ERROR_CONFLICT)
      .send({ message: "Пользователь с такой почтой уже существует" });
  }
  if (
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    const message = err;
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Некорректные данные" });
  }
  return res.status(ERROR_SERVER).send({ message: "Ошибка сервера" });
}

module.exports = centralErrorHandler;