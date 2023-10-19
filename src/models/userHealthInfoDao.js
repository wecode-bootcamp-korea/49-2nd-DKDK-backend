const { AppDataSource } = require("./dataSource");

const checkExistence = async (userId) => {
  const exist = await AppDataSource.query(
  ` SELECT id FROM users where id = ?`,
  [userId]
  );
  return exist.length === 1;
  };

// Trainer회원인지 일반 회원인지 체크
const checkTrainer = async (userId) => {
  const isTrainer = await AppDataSource.query(
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
  return isTrainer[0].isTrainer;
};

// GET - 유저 정보
const userInfo = async (userId) => {
  return await AppDataSource.query(
    `
    SELECT u.img_url AS profileImage,
      u.nickname as nickname,
      u.height AS height,
      u.weight AS weight,
      wc.category AS interested_workout,
      CASE
        WHEN (SELECT so.end_at FROM sub_orders so WHERE so.user_id = u.id) IS NULL THEN 'false'
        ELSE (SELECT DATE(so.end_at) FROM sub_orders so WHERE so.user_id = u.id)
      END AS subEndDate
    FROM users u
    JOIN workout_categories wc ON wc.id = u.interested_workout
    WHERE u.id = ?;
    `,
    [userId]
  );
};

// GET - 트레이너 정보
const trainerInfo = async (userId) => {
  const trainerInfo = await AppDataSource.query(
    `
    SELECT
      wc.category AS specialization,
      COUNT(DISTINCT po.buyer_user_id) AS customers,
      (SELECT COUNT(*) FROM comments c2 WHERE c2.user_id = t.user_id) AS comments
    FROM trainers t
    JOIN users u ON u.id = t.user_id
    JOIN products p ON p.trainer_id = t.id
    JOIN pt_orders po ON po.product_id = p.id
    JOIN workout_categories wc ON wc.id = t.specialized
    WHERE u.id = ?
    GROUP BY specialization;
    `,
    [userId]
  );
  return trainerInfo.length === 0 ? "NOT_A_TRAINER" : trainerInfo;
};

// GET - PT 주문정보
const ptOrderInfo = async (userId) => {
  const ptOrderDetail = await AppDataSource.query(
    `
    SELECT
      (SELECT u.nickname FROM users u WHERE u.id = t.user_id) AS trainerName,
      (SELECT u.img_url FROM users u WHERE u.id = t.user_id) AS profileImg,
      t.specialized AS specialized,
      (SELECT COUNT(DISTINCT po.buyer_user_id)
        FROM pt_orders po
        JOIN products p ON p.id = po.product_id
        WHERE p.trainer_id = t.id) AS customers,
      (SELECT COUNT(*) FROM comments c WHERE c.user_id = t.user_id) AS comments,
      wc.category AS category,
      DATE(DATE_ADD(p.created_at, INTERVAL p.term MONTH)) AS end_at,
      p.available_area AS availableArea
    FROM pt_orders po
    JOIN products p ON p.id = po.product_id
    JOIN trainers t ON p.trainer_id = t.id
    JOIN workout_categories wc ON p.category_name = wc.id
    WHERE po.buyer_user_id = ?
    `,
    [userId]
  );
  return ptOrderDetail.length === 0 ? "NO_PT_ORDERS" : ptOrderDetail;
};

// GET - 구독권 정보
const subOrderInfo = async (userId) => {
  const subOrderDetails = await AppDataSource.query(
    `
    SELECT so.user_id AS userId,
        so.sub_id AS subscriptionId,
        s.price AS price,
        s.term As term,
        so.created_at AS orderedAt,
        so.end_at AS endAt
    FROM sub_orders so
    JOIN subscriptions s ON so.sub_id = s.id
    WHERE so.user_id = ?;
    `,
    [userId]
  );
  return subOrderDetails.length === 0 ? "NO_SUB_ORDERS" : subOrderDetails;
};

// GET - 식단
const foodRcmd = async (grade) => {
  return await AppDataSource.query(
    `
    SELECT f.meal_plan_id as id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'typeId', f.type_id,
            'name', f.name,
            'kcal', f.kcal,
            'weight', f.weight,
            'imgUrl', f.img_url
            )
          ) AS mealPlan
        FROM foods f
        JOIN meal_plans mp ON mp.id = f.meal_plan_id
        JOIN food_types ft on ft.id = f.type_id
        WHERE mp.grade = ?
        GROUP BY f.meal_plan_id
        ORDER BY RAND()
        LIMIT 1;
    `,
    [grade]
  );
};

// GET - 추천 운동
const workoutRcmd = async (userId) => {
  return await AppDataSource.query(
    `
    SELECT * FROM workouts w
    JOIN workout_categories wc ON wc.id = w.category_id
    WHERE w.category_id = (SELECT interested_workout FROM users u WHERE u.id = ?)
    ORDER BY RAND()
    LIMIT 5;
    `,
    [userId]
  );
};

// 유저정보 수정
const userUpdate = async (
  userId,
  nickname,
  profileImg,
  height,
  weight,
  workoutLoad,
  interestedWorkout
) => {
  return await AppDataSource.query(
    `
    UPDATE users
        SET nickname = ?,
        img_url = ?,
        height = ?,
        weight = ?,
        workout_load = ?,
        interested_workout = ?
    WHERE id = ?
    `,
    [
      nickname,
      profileImg,
      height,
      weight,
      workoutLoad,
      interestedWorkout,
      userId,
    ]
  );
};

// 트레이너가 자기 정보 업데이트
const trainerUpdate = async (
  userId,
  nickname,
  profileImg,
  height,
  weight,
  specialized
) => {
  await AppDataSource.query(
    `
    UPDATE users
    SET nickname = ?,
        profileImg = ?,
        height = ?,
        weight = ?,
    WHERE id = ?;
    `,
    [nickname, profileImg, height, weight, userId]
  );

  await AppDataSource.query(
    `
    UPDATE trainers t
    JOIN users u ON u.id = t.user_id
    SET t.specialized = ?
    WHERE u.id = ?;
    `,
    [specialized, userId]
  );
};

module.exports = {
  checkExistence,
  checkTrainer,
  userInfo,
  trainerInfo,
  ptOrderInfo,
  subOrderInfo,
  foodRcmd,
  workoutRcmd,
  userUpdate,
  trainerUpdate,
};
