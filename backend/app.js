const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const { PORT, DB_ADDRESS } = require('./config');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/auth');
const { auth } = require('./middlewares/auth');
const celebrates = require('./middlewares/celebrates');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { NotFoundError } = require('./errors/customErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

// const corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Content-type', 'Authorization'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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



// ssh jegor-andreychuk@158.160.57.251
// NODE_ENV=production
// JWT_SECRET='dev-secret'