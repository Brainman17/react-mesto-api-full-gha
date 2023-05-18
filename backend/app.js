const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/auth');
const { auth } = require('./middlewares/auth');
const celebrates = require('./middlewares/celebrates');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { NotFoundError } = require('./errors/customErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors());

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => { //краш-тест
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// за ним идут все обработчики роутов
app.post('/signin', celebrates.signIn, login);
app.post('/signup', celebrates.signUp, createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use('*', (res, req, next) => {
  const err = new NotFoundError('Данные не найдены!');
  next(err);
});

app.use(errors()); // обработчик ошибок celebrate
app.use(centralErrorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application listening on ${PORT}!`);
});

// cloud-jegor-andreichuk - облако

// ssh jegor-andreychuk@158.160.57.251

