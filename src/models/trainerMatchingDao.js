const { AppDataSource } = require("./dataSource");

//트레이너 전체 정보
const getTrainerMatching = async (
  sortQuery,
  categoryQuery,
  genderQuery,
  trainerCheckQuery,
  offsetQuery
) => {
  const [result] = await AppDataSource.query(`
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
        u.img_url AS imgUrl
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

const isTrainer = async (userId) => {
  const [result] = await AppDataSource.query(
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
  return result.isTrainer;
};
// 구독자 여부 확인
const isSubscribed = async (userId) => {
  const [result] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT u.nickname FROM sub_orders so
            JOIN users u ON so.user_id  = u.id
            WHERE u.id = ?) IS NULL
            THEN 'false'
            ELSE 'true'
        END AS isSubscribed;
      `,
    [userId]
  );
  return result.isSubscribed;
};
const isPostedTrainer = async (trainerId) => {
  const [result] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT p.id FROM products p
            WHERE p.trainer_id = ?) IS NULL
            THEN 'false'
            ELSE 'true'
        END AS isPostedTrainer;
          `,
    [trainerId]
  );
  return result.isPostedTrainer;
};

const findTrainerId = async (userId) => {
  const [trainerId] = await AppDataSource.query(
    `
    SELECT t.id AS id
    FROM trainers t
    JOIN users u ON u.id = t.user_id
    WHERE u.id = ?;`,
    [userId]
  );
  return trainerId.id;
};

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
  userId,
  trainerId,
  imgUrl,
  availableArea,
  price,
  availableTime,
  term,
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
    [
      trainerId,
      availableArea,
      availableTime,
      categoryName,
      term,
      price,
      content,
    ]
  );
  console.log("success");
};
const upadateTrainerMatching = async (productId, status) => {
  await AppDataSource.query(`
    UPDATE producsts
        status  = ${status}
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
