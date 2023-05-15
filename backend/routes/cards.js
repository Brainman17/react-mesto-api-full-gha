const express = require("express");
const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const celebrates = require('../middlewares/celebrates');

cardRouter.get("/cards", getCards);

cardRouter.post("/cards", celebrates.createCard, createCard);

cardRouter.delete("/cards/:cardId", celebrates.checkIdCard, deleteCard);

cardRouter.put("/cards/:cardId/likes", celebrates.checkIdCard, likeCard);

cardRouter.delete("/cards/:cardId/likes", celebrates.checkIdCard, dislikeCard);

module.exports = { cardRouter };
