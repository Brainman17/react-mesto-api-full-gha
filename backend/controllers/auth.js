/* eslint-disable no-shadow */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const { STATUS_CREATED, ERROR_CONFLICT } = require("../utils/constants");
const { ConflictError } = require("../errors/customErrors");
const mongoose = require("mongoose");
const { ValidationError } = mongoose.Error;
const { key } = require("../config");

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, {
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
    .then((hash) =>
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => next(err));
};
module.exports = {
  login,
  createUser,
};
