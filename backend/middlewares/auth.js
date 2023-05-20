const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/customErrors");
const { JWT_SECRET } = process.env;


const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // const token = req.headers.authorization.replace("Bearer ", "");
  const token = authorization.replace("Bearer ", "");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(new UnauthorizedError("Необходима авторизация"));
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
