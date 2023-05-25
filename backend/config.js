require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;
const { PORT = 3005 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  SECRET: NODE_ENV === 'production'  && JWT_SECRET ? JWT_SECRET : 'hardcoded-dev-secret',
  NODE_ENV,
  PORT,
  DB_ADDRESS,
};