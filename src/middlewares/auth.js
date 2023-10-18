const jwt = require("jsonwebtoken");
const { throwError } = require("../utilities/throwError");
//.env 파일에 SECRET 항목을 추가해줘야 합니다.
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
    error.message = error.message.toUpperCase().replaceAll(" ", "_");
    next(error);
  }
};

module.exports = { validateToken };