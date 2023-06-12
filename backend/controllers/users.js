/* eslint-disable no-shadow */
const user = require('../models/users');
const { NotFoundError } = require('../errors/NotFoundError');

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Такого пользователя не существует');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  user
    .findById(_id)
    .orFail(() => {
      throw new NotFoundError('Такого пользователя не существует');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;

  user
    .findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      { new: true },
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;

  user
    .findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar },
      { new: true },
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
