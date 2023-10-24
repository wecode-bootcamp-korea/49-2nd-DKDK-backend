// tests/user.test.js
const request = require("supertest");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");
const jwt = require("jsonwebtoken");

describe("RECORD SERVICE: READ RECORD", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize().then();

    const user = await AppDataSource.query(`
      INSERT INTO users (
        id, 
        nickname, 
        birthday, 
        gender, 
        phone_number, 
        height, 
        weight, 
        user_type, 
        img_url)
      VALUES 
      (1, '아무개', '1994-04-12', 'Male', 1072231234, 180.00, 75.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
      (2, '아무개2', '1994-04-12', 'Male', 1072231234, 180.00, 75.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
      (3, '아무개3', '1995-04-12', 'Male', 1072231235, 181.00, 76.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
      (4, '아무개4', '1996-04-12', 'Male', 1072231236, 182.00, 77.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg')
    `);

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET);

    await AppDataSource.query(`
    INSERT INTO workout_records (
        user_id, 
        water_content, 
        workout_time, 
        current_weight, 
        muscle_mass, 
        body_fat, 
        max_heartrate, 
        created_at) 
    VALUES
        (3, 23, 4.5, 31, 33, 40.10, 169, '2023-10-01 00:00:00'),
        (3, 22, 24, 32, 34, 41.87, 187, '2023-10-02 00:00:00'),
        (3, 21, 8.5, 45, 35, 43.75, 149, '2023-10-03 00:00:00'),
        (3, 20, 7, 67, 38, 48.10, 181, '2023-10-04 00:00:00'),
        (3, 19, 3.5, 76, 39, 51.32, 161, '2023-10-05 00:00:00'),
        (3, 18, 4, 79, 40, 54.79, 161, '2023-10-06 00:00:00'),
        (3, 17, 6, 77, 41, 57.75, 161, '2023-10-07 00:00:00'),
        (4, 26, 0.5, 79.1, 33, 40.10, 169, '2023-10-01 00:00:00'),
        (4, 24, 1, 74.2, 34, 41.87, 187, '2023-10-02 00:00:00'),
        (4, 23, 0.5, 76, 35, 43.75, 149, '2023-10-03 00:00:00'),
        (4, 22, 1, 79, 38, 48.10, 181, '2023-10-04 00:00:00'),
        (4, 21, 1.5, 76, 39, 51.32, 186, '2023-10-05 00:00:00'),
        (4, 27, 1, 73, 40, 54.79, 183, '2023-10-06 00:00:00'),
        (4, 30, 2, 71, 41, 57.75, 182, '2023-10-07 00:00:00')
    `);
  });

  test("SUCCESS: READ USER RECORD", async () => {
    await request(app)
      .get("/records")
      .set("Authorization", accessToken)
      .expect(200)
      .expect({
        "numberMuscleRecords": "[{\"date\": \"2023-10-01\", \"value\": 33.00}, {\"date\": \"2023-10-02\", \"value\": 34.00}, {\"date\": \"2023-10-03\", \"value\": 35.00}, {\"date\": \"2023-10-04\", \"value\": 38.00}, {\"date\": \"2023-10-05\", \"value\": 39.00}, {\"date\": \"2023-10-06\", \"value\": 40.00}, {\"date\": \"2023-10-07\", \"value\": 41.00}]",
        "numberWeightRecords": "[{\"date\": \"2023-10-01\", \"value\": 79.10}, {\"date\": \"2023-10-02\", \"value\": 74.20}, {\"date\": \"2023-10-03\", \"value\": 76.00}, {\"date\": \"2023-10-04\", \"value\": 79.00}, {\"date\": \"2023-10-05\", \"value\": 76.00}, {\"date\": \"2023-10-06\", \"value\": 73.00}, {\"date\": \"2023-10-07\", \"value\": 71.00}]",
        "numberFatRecords": "[{\"date\": \"2023-10-01\", \"value\": 40.10}, {\"date\": \"2023-10-02\", \"value\": 41.87}, {\"date\": \"2023-10-03\", \"value\": 43.75}, {\"date\": \"2023-10-04\", \"value\": 48.10}, {\"date\": \"2023-10-05\", \"value\": 51.32}, {\"date\": \"2023-10-06\", \"value\": 54.79}, {\"date\": \"2023-10-07\", \"value\": 57.75}]",
        "numberHeartbeatRecords": "[{\"date\": \"2023-10-01\", \"value\": 169}, {\"date\": \"2023-10-02\", \"value\": 187}, {\"date\": \"2023-10-03\", \"value\": 149}, {\"date\": \"2023-10-04\", \"value\": 181}, {\"date\": \"2023-10-05\", \"value\": 186}, {\"date\": \"2023-10-06\", \"value\": 183}, {\"date\": \"2023-10-07\", \"value\": 182}]",
        "numberCompareTime": [
            {
                "avgTimeTotal": 4.642857,
                "avgTimeTotalKr": "4시간 39분",
                "name": "전체 평균"
            },
            {
                "avgTimeTotal": 1.071429,
                "avgTimeTotalKr": "1시간 4분",
                "name": "내 평균"
            }
        ]
    });
  });

  test("FAILED: NO USER", async () => {
    await request(app)
      .get("/records")
      .set("Authorization", "1234")
      .expect(400)
      .expect({"message":"JWT_MALFORMED"});
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`TRUNCATE TABLE workout_records;`);
    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });
});

describe("RECORD SERVICE: CREATE/UPDATE RECORD", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize().then();

    const user = await AppDataSource.query(`
        INSERT INTO users (
          id, 
          nickname, 
          birthday, 
          gender, 
          phone_number, 
          height, 
          weight, 
          user_type, 
          img_url)
        VALUES 
        (1, '아무개', '1994-04-12', 'Male', 1072231234, 180.00, 75.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
        (2, '아무개2', '1994-04-12', 'Male', 1072231234, 180.00, 75.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
        (3, '아무개3', '1995-04-12', 'Male', 1072231235, 181.00, 76.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg'),
        (4, '아무개4', '1996-04-12', 'Male', 1072231236, 182.00, 77.00, 1, 'https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg')
      `);

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET);
    console.log(accessToken);

    await AppDataSource.query(`
      INSERT INTO workout_records (
          user_id, 
          water_content, 
          workout_time, 
          current_weight, 
          muscle_mass, 
          body_fat, 
          max_heartrate, 
          created_at) 
      VALUES 
          (4, 26, 0.5, 79.1, 33, 40.10, 169, '2023-10-01 00:00:00'),
          (4, 24, 1, 74.2, 34, 41.87, 187, '2023-10-02 00:00:00'),
          (4, 23, 0.5, 76, 35, 43.75, 149, '2023-10-03 00:00:00'),
          (4, 22, 1, 79, 38, 48.10, 181, '2023-10-04 00:00:00'),
          (4, 21, 1.5, 76, 39, 51.32, 186, '2023-10-05 00:00:00'),
          (4, 27, 1, 73, 40, 54.79, 183, '2023-10-06 00:00:00'),
          (4, 30, 2, 71, 41, 57.75, 182, '2023-10-07 00:00:00')
      `);
  });

  test("SUCCESS: CREATE CURRENT DATE RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        waterContent: 24,
        workoutTime: 1,
        currentWeight: 78,
        muscleMass: 23,
        bodyFat: 23,
        maxHeartrate: 145,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE WATER CONTENT RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        waterContent: 24,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE WEIGHT RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        currentWeight: 78,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE MAX HEARTBEAT RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        maxHeartrate: 145,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE BODY FAT RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        bodyFat: 23,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE WORKOUT TIME RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        workoutTime: 1,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE BODY FAT RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        bodyFat: 23,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("SUCCESS: UPDATE MUSCLE MASS RECORD", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", accessToken)
      .send({
        muscleMass: 23,
      })
      .expect(200)
      .expect({"message":"UPDATED"});
  });

  test("FAIL: MALFORMED USER UPDATE", async () => {
    await request(app)
      .post("/records")
      .set("Authorization", "1234")
      .send({
        muscleMass: 23,
      })
      .expect(400)
      .expect({"message":"JWT_MALFORMED"});
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`TRUNCATE TABLE workout_records;`);
    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });
});
