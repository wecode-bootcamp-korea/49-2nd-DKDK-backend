const jwt = require("jsonwebtoken");
const { throwError } = require("../utils/throwError");
const { SECRET } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { userId } = jwt.verify(token, SECRET);
    if (!token) {
      throwError(401, "ACCESS_TOKEN_REQUIRED");
    }
    req.userId = userId;
    next();
  } catch (error) {
    error.status = error.status || 400;
    error.message = error.message.toUpperCase().replace(/ /g, "_");
    next(error);
  }
};

module.exports = { validateToken };
