/* eslint-disable no-console */
require('dotenv').config();

const { NODE_ENV } = process.env;
const { PORT = 3001 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const key = process.env.REACT_APP_JWT_SECRET || 'my-dev-key';

module.exports = {
  key,
  NODE_ENV,
  PORT,
  DB_ADDRESS,
};
