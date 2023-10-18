const request = require("supertest");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");
const jwt = require("jsonwebtoken");

describe("Sign up", () => {
  let app;
  let userId;
  let accessToken;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    const user = await AppDataSource.query(`
      INSERT INTO users (kakao_id, img_url)
      VALUES ('12345', "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg");
    `);

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET);

  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE trainers`);

    await AppDataSource.destroy(); // 연결 끊기
  });

  test("SUCCESS: update user_trainer", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: 2,
        nickname: "슈슈",
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
        specialized : 1
      })
      .expect(200);
  });

  test("FALIED : KEY_ERROR", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: 1,
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,

      })
      .expect(400)
      .expect({ message: "KEY_ERROR" });
  });

  test("FALIED : INVALID_USER_TYPE", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: 5,
        nickname: "슈슈",
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
      })
      .expect(400)
      .expect({ message: "INVALID_USER_TYPE" });
  });




});
