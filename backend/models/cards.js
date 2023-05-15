const mongoose = require('mongoose');
const validator = require("validator");
const { REGEX_LINK } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: { //имя карточки
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Минимальная длина поля "name" - 30']
  },
  link: { //ссылка на картинку
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: { validator: (v) => REGEX_LINK.test(v) }
  },
  owner: { //ссылка на модель автора карточки
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено']
  },
  likes: [{ //список лайкнувших пост пользователей
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: { //дата создания
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);