/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const { PORT, DB_ADDRESS } = require('./config');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { login, createUser } = require('./controllers/auth');
const { auth } = require('./middlewares/auth');
const celebrates = require('./middlewares/celebrates');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => { // краш-тест
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

app.use('*', (res, req, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(centralErrorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}!`);
});

// ssh jegor-andreychuk@158.160.57.251
