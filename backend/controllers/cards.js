/* eslint-disable no-shadow */
const card = require('../models/cards');
const { NotFoundError, ForbiddenError } = require('../errors/customErrors');
const { STATUS_CREATED } = require('../utils/constants');

const getCards = (req, res, next) => {
  card
    .find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card
    .create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;

  card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не существует!');
      }

      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('Нельзя удалить чужую карточку!');
      } return card.findByIdAndRemove(req.params.cardId);
    })
    .then((deleteCard) => {
      res.send({ data: deleteCard });
    })
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не существует!');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(ERROR_CONFLICT)
          .send({ message: 'Пользователь с такой почтой уже существует' });
      } return next(err)
    });
};

const dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не существует!');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
