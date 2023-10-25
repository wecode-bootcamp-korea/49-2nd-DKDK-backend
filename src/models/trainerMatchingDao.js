const { AppDataSource } = require("./dataSource");

//트레이너 전체 정보
const getTrainerMatching = async (
  sortQuery,
  categoryQuery,
  genderQuery,
  trainerCheckQuery,
  offsetQuery
) => {
  const result = await AppDataSource.query(`
        SELECT 
        p.id AS id,
        u.nickname AS name,
        p.trainer_id AS trainerId,
        p.available_area AS availableArea,
        p.available_time AS availableTime,
        p.category_name AS categoryName,
        p.term AS term,
        p.price AS price,
        p.content AS content,
        p.created_at AS createdAt ,
        u.gender AS gender,
        t.specialized AS specialized,
        u.img_url AS imgUrl
        FROM products p 
        JOIN trainers t ON t.id = p.trainer_id
        JOIN users u ON u.id = t.user_id
        WHERE p.status = 1
        ${categoryQuery}
        ${genderQuery}
        ${trainerCheckQuery}
        ${sortQuery}
        ${offsetQuery};
        `);
  return result;
};
//트레이너 상세 정보
const getTrainerMatchingDetail = async (productId) => {
  const [result] = await AppDataSource.query(
    `
        SELECT 
        p.id AS id,
        p.trainer_id AS trainerId,
        p.available_area AS availableArea,
        p.available_time AS availableTime,
        p.category_name AS categoryName,
        p.term AS term,
        p.price AS price,
        p.content AS content,
        p.created_at AS createdAt ,
        u.gender AS gender,
        t.specialized AS specialized,
        u.img_url AS imgUrl,
        u.height AS height,
        u.weight AS weight
        FROM products p 
        JOIN trainers t ON t.id = p.trainer_id
        JOIN users u ON u.id = t.user_id
        WHERE p.status = 1
        AND p.id = ?;
        `,
    [productId]
  );
  return result;
};
// 트레이너 확인
const isTrainer = async (userId) => {
  const [result] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT u.nickname FROM trainers t
            JOIN users u ON t.user_id  = u.id
            WHERE u.id = ?) IS NULL
            THEN 0
            ELSE 1
        END AS isTrainer;
    `,
    [userId]
  );
  return result.isTrainer;
};
// 구독자 여부 확인
const isSubscribed = async (userId) => {
  const [result] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT u.nickname FROM sub_orders so
            JOIN users u ON so.user_id  = u.id
            WHERE u.id = ?) IS NULL
            THEN 0
            ELSE 1
        END AS isSubscribed;
      `,
    [userId]
  );
  return result.isSubscribed;
};
// 트레이너 글작성확인
const isPostedTrainer = async (trainerId) => {
  const [result] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT p.id FROM products p
            WHERE p.trainer_id = ?
            AND p.status = 1) IS NULL
            THEN 1
            ELSE 0
        END AS isPostedTrainer;
          `,
    [trainerId]
  );
  return result.isPostedTrainer;
};
// 트레이너id 찾기
const findTrainerId = async (userId) => {
  const [trainerId] = await AppDataSource.query(
    `
    SELECT t.id AS id
    FROM trainers t
    JOIN users u ON u.id = t.user_id
    WHERE u.id = ?;`,
    [userId]
  );
  if (trainerId === undefined) return 0;
  return trainerId.id;
};
// 트레이너 전문분야 찾기
const findSpecializedCategoryByTrainerId = async (trainerId) => {
  const [category] = await AppDataSource.query(
    `
    SELECT wc.category AS name
    FROM workout_categories wc
    JOIN trainers t ON t.specialized = wc.id
    WHERE t.id = ?;`,
    [trainerId]
  );
  return category.name;
};
const createTrainerMatching = async (
  trainerId,
  userId,
  name,
  place,
  price,
  time,
  period,
  content,
  categoryName
) => {
  // await AppDataSource.query(`
  // UPDATE users
  // SET img_url = ${imgUrl}
  // WHERE id = ${userId};
  // `);

  await AppDataSource.query(
    `
  INSERT INTO products ( 
    trainer_id,
    available_area,
    available_time,
    category_name,
    term,
    price,
    content)
  VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [trainerId, place, time, categoryName, period, price, content]
  );
};
const upadateTrainerMatching = async (productId, status) => {
  await AppDataSource.query(`
    UPDATE products
        SET status  = ${status}
        WHERE id = ${productId};
    `);
};

module.exports = {
  getTrainerMatching,
  getTrainerMatchingDetail,
  isSubscribed,
  isTrainer,
  isPostedTrainer,
  createTrainerMatching,
  findTrainerId,
  findSpecializedCategoryByTrainerId,
  upadateTrainerMatching,
};
