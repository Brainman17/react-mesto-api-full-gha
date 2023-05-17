require('dotenv').config();

const { JWT_SECRET } = process.env;
const { PORT = '3000' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT
};