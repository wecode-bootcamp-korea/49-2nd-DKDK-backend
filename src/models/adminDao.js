const { AppDataSource } = require("./dataSource");

const logInCheck = async (email) => {
  const req = await AppDataSource.query(
    `
  SELECT * FROM users WHERE email = ?`,
    [email]
  );
  return req;
};

module.exports = { logInCheck };
