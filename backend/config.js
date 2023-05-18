const crypto = require('crypto'); // экспортируем crypto

const randomString = crypto
  .randomBytes(16) // сгенерируем случайную последовательность 16 байт (128 бит)
  .toString('hex'); // приведём её к строке

module.exports = {
  randomString
}