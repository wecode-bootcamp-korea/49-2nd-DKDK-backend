const { dataSource } = require("./dataSource");

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

const userInfo = async (userId) => {
  await dataSource.query(
    `
    SELECT u.nickname,  FROM users u WHERE id = ?
    `,
    [userId]
  );
};

const trainerInfo = async (userId) => {
  await dataSource.query(
    `
        SELECT * FROM
        `
  );
};

const ptOrderInfo = async (userId) => {
  await dataSource.query(
    `
    SELECT * FROM pt_orders;
    `,
    []
  );
};

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
