const { AppDataSource } = require("./dataSource");

//트레이너 전체 정보
const getTrainerMatching = async (
  sortQuery,
  categoryQuery,
  genderQuery,
  trainerCheckQuery,
  products
) => {
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
    u.gender AS gender,
    t.specialized AS specialized,
    u.img_url AS imgUrl
    FROM products p 
    JOIN trainer t ON t.id = p.trainer_id
    JOIN users u ON u.id = t.user_id
    WHERE 1=1
    ${categoryQuery}
    ${genderQuery}
    ${trainerCheckQuery}
    ${sortQuery}
    ${products}
    `);
  return result;
};

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
const isSubscribed = async (userId) => {
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

module.exports = { getTrainerMatching, isSubscribed, isTrainer };
