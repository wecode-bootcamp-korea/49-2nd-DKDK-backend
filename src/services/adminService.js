const { adminDao } = require("../models");
const logIn = async (email, password) => {
  const req = await adminDao.logInCheck(email);
  if (req.password == password) return true;
};
module.exports = { logIn, signup };
