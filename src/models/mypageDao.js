const { dataSource } = require("./dataSource");

// Trainer회원인지 일반 회원인지 체크, 서비스 단에서 체크한뒤
// 필요한 화면 정보를 전달하는 Dao를 작성예정
const checkTrainer = async (userId) => {
  await dataSource.query(
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
};

// 유저 정보 확인 - 잠정 완료
const userInfo = async (userId) => {
  await dataSource.query(
    `
    SELECT u.img_url AS profileImage,
        u.nickname as nickname,
        u.height AS height,
        u.weight AS weight,
        wc.category AS interested_workout,
        CASE
        WHEN so.end_at IS NULL THEN 'false'
            ELSE DATE(so.end_at)
        END AS subEndDate
    FROM users u
    JOIN workout_categories wc ON wc.id = u.interested_workout
    JOIN sub_orders so ON so.user_id = u.id
    WHERE u.id = ?;
    `,
    [userId]
  );
};

// 유저정보 수정
const userInfoUpdate = async (
  userId,
  nickname,
  profileImg,
  height,
  weight,
  workoutLoad,
  interestedWorkout
) => {
  await dataSource.query(
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

// 유저가 볼 수 있는 트레이너 정보 - 유저 입장
const trainerInfo = async (userId) => {
  await dataSource.query(
    `
    SELECT u.img_url AS profileImage,
        u.nickname as nickname,
        u.height AS height,
        u.weight AS weight,
        ANY_VALUE(wc.category) AS specialized,
        COUNT(c.id) AS numOfComments
    FROM users u
    JOIN trainers t ON t.user_id = u.id
    JOIN workout_categories wc ON wc.id = t.specialized
    LEFT JOIN comments c on u.id = c.user_id
    WHERE u.id = ?
    GROUP BY u.id;
    `,
    [userId]
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
  await dataSource.query(
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

  await dataSource.query(
    `
    UPDATE trainers t
    JOIN users u ON u.id = t.user_id
    SET t.specialized = ?
    WHERE u.id = ?;
    `,
    [specialized, userId]
  );
};
// 잠정 완료
const ptOrderInfo = async (userId) => {
  await dataSource.query(
    `
    SELECT
        (SELECT u.nickname FROM users u JOIN trainers t ON u.id = t.user_id WHERE t.id = p.trainer_id) AS trainerName,
        (SELECT u.img_url FROM users u JOIN trainers t ON u.id = t.user_id WHERE t.id = p.trainer_id) AS profileImg,
        po.created_at AS purchaseDate,
        p.available_area AS availalbeArea,
        p.available_time AS availableTime,
        p.category_name AS category,
        p.price AS price,
        p.content AS content
    FROM pt_orders po
    JOIN products p ON p.id = po.product_id
    JOIN users u ON po.buyer_user_id = u.id
    WHERE u.id = ?;
    `,
    [userId]
  );
};

// 잠정 완료
const subOrderInfo = async (userId) => {
  await dataSource.query(
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
};

// 잠정 완료
const foodRcmd = async (grade) => {
  await dataSource.query(
    `
    SELECT JSON_ARRAYAGG(
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
        WHERE mp.grade = ? GROUP BY f.meal_plan_id;
        ORDER BY RAND()
        LIMIT 1;
    `,
    [grade]
  );
};

// 잠정 완료
const workoutRcmd = async (userId) => {
  await dataSource.query(
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

module.exports = {
  checkTrainer,
  userInfo,
  trainerInfo,
  ptOrderInfo,
  subOrderInfo,
  foodRcmd,
  workoutRcmd,
};