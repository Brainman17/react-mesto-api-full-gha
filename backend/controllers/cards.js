/* eslint-disable no-shadow */
const Card = require('../models/cards');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { STATUS_CREATED } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card
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

  Card
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
  const { cardId } = req.params;

  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не существует!');
      }

      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('Нельзя удалить чужую карточку!');
      } return Card.findByIdAndRemove(cardId);
    })
    .then((deleteCard) => {
      res.send({ data: deleteCard });
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card
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
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card
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
