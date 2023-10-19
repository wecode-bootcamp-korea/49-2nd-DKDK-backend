const { AppDataSource } = require("./dataSource");

const getTrainerMatching = async () => {
  const [result] = await AppDataSource.query(`
    SELECT * FROM products
    `);
  return result;
};

module.exports = { getTrainerMatching };
