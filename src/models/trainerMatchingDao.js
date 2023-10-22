const { AppDataSource } = require("./dataSource");
const { products } = require("./trainerQueryBuilder");

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
        ${products}
        `);
  return result;
};

//트레이너 상세 정보
const getTrainerMatchingDetail = async (productsId) => {
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
    [productsId]
  );
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
  return result.isTrainer;
};
// 구독자 여부 확인
const isSubscribed = async (userId) => {
  const result = await AppDataSource.query(
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
const isPostedTrainer = async (productsId, trainerId) => {
  const result = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT p.id FROM p
            WHERE p.id = ?
            AND p.trainer_id = ?) IS NULL
            THEN 'false'
            ELSE 'true'
        END AS isPostedTrainer;
          `,
    [productsId, trainerId]
  );
  return result.isPostedTrainer;
};

const findTrainerId = async (userId) => {
  const [trainerId] = await AppDataSource.query(
    `
    SELECT t.id AS id
    FROM trainer t
    JOIN users u ON u.id = t.user_id
    WHERE u.id = ?;`,
    [userId]
  );
  return trainerId.id;
};
const findCategoryName = async (trainerId) => {
  const [category] = await AppDataSource.query(
    `
    SELECT wc.category AS name
    FROM workout_category wc
    JOIN trainers t ON t.specialized = wc.id
    WHERE t.id = ?;`,
    [trainerId]
  );
  return category.name;
};
const postTrainerMatching = async (
  userId,
  trainerId,
  imgUrl,
  availableArea,
  price,
  availableTime,
  term,
  content
) => {
  await AppDataSource.query(`
  UPDATE users 
  SET img_url = ${imgUrl}
  WHERE id = ${userId};
  `);

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
};
const deleteTrainerMatching = async (productsId, stat) => {
  await AppDataSource.query(`
    UPDATE producsts
        status  = ${stat}
        WHERE id = ${productsId};
    `);
};

module.exports = {
  getTrainerMatching,
  getTrainerMatchingDetail,
  isSubscribed,
  isTrainer,
  isPostedTrainer,
  postTrainerMatching,
  findTrainerId,
  findCategoryName,
  deleteTrainerMatching,
};
