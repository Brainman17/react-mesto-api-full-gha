/* eslint-disable no-console */
require('dotenv').config();

const { NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const key = process.env.JWT_SECRET || 'my-dev-key';

console.log(process.env.NODE_ENV);
console.log(process.env.JWT_SECRET);

module.exports = {
  key,
  NODE_ENV,
  PORT,
  DB_ADDRESS,
};
