/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmMTViNmIwMjBjMWUxYzgyNGI3OTciLCJpYXQiOjE2ODY1MDc4MzgsImV4cCI6MTY4NzExMjYzOH0.3JnDNQOvSSr8DFk1zb8pL6QT8_5xaOCdVuyTU2IP4SQ'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'eb28131ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b'; // вставьте сюда секретный ключ для разработки из кода
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
