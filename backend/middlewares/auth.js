const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/customErrors")

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // const token = req.headers.authorization.replace("Bearer ", "");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "dev-secret");
  } catch {
    return next(new UnauthorizedError("Необходима авторизация"));
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
