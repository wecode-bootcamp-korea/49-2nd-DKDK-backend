const jwt = require("jsonwebtoken");

// jwt 생성
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET);
  };

module.exports = { generateToken } ;