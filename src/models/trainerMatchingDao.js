const { AppDataSource } = require("./dataSource");

const getTrainerMatching = async () => {
  const [result] = await AppDataSource.query(`
    SELECT * FROM products
    `);
  return result;
};
// 트레이너 여부
const isTrainer = async (userId) => {
  const result = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT u.nickname FROM trainers t
            JOIN users u ON t.user_id  = u.id
            WHERE u.id = ?) IS NULL
            THEN 'false'
            ELSE 'true'
        END AS isTrainer;
    `,
    [userId]
  );
  return result;
};
// 구독자 여부 확인
const isSubscript = async (userId) => {
  await AppDataSource.query(
    `SELECT CASE
          WHEN (SELECT u.nickname FROM sub_orders so
              JOIN users u ON so.user_id  = u.id
              WHERE u.id = ?) IS NULL
              THEN 'false'
              ELSE 'true'
          END AS isTrainer;
      `,
    [userId]
  );
  return result;
};

module.exports = { getTrainerMatching, isSubscript, isTrainer };
