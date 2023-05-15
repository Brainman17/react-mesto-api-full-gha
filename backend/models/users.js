const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { REGEX_AVATAR_LINK } = require('../utils/regex');
const { UnauthorizedError } = require("../errors/customErrors");

const userSchema = new mongoose.Schema({
  name: {
    //имя пользователя
    type: String,
    default: "Жак-Ив Кусто",
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30']
  },
  about: {
    //информация о пользователе
    type: String,
    default: "Исследователь",
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Минимальная длина поля "about" - 30']
  },
  avatar: {
    //ссылка на аватарку
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: { validator: (v) => REGEX_AVATAR_LINK.test(v) }
  },
  email: {
    type: String,
    validate: { validator: (v) => validator.isEmail(v) },
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false
  }
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError("Неправильные почта или пароль"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError("Неправильные почта или пароль"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
