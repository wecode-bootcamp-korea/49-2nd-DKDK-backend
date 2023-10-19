const { AppDataSource } = require("./dataSource");

//트레이너 전체 정보
const getTrainerMatching = async (limit, offset) => {
  const [result] = await AppDataSource.query(`
    SELECT 
    p.id AS id,
    p.trainer_id AS trainer_id,
    p.available_area AS available_area,
    p.available_time AS available_time,
    p.category_name AS category_name,
    p.term AS term,
    p.price AS price,
    p.content AS content,
    p.created_at AS created_at ,


    FROM products p 
    `);
  return result;
};
//쿼리빌더 필요
const sortTrainerMatching = async (offset, limit, sort, kind, gender) => {
  cosnt[result] = await AppDataSource.query(``);
};
//정렬된 트레이너 정보 쿼리빌더 사용할까?
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
