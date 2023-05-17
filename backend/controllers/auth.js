const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { STATUS_CREATED } = require("../utils/constants");
const { NODE_ENV } = process.env;
const { JWT_SECRET } = require('../config')

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch(err => next(err));
};

module.exports = {
  login,
  createUser
};
