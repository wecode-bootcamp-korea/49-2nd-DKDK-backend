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

    await AppDataSource.destroy(); 
  });

  test("SUCCESS: update user", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: "1",
        nickname: "슈슈",
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
      })
      .expect(200)
      .expect({ message: "SIGNUP_SUCCESS" });
  });

  test("FALIED : KEY_ERROR", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: "1",
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
        userType: "5",
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

  test("FALIED : INVAILD_PHONE_NUMBER", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: "1",
        nickname: "슈슈",
        phoneNumber: "072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
      })
      .expect(400)
      .expect({ message: "INVAILD_PHONE_NUMBER" });
  });

  test("FALIED : INVAILD_NUMERIC", async () => {
    await request(app)
      .post("/user/signup")
      .set("Authorization", accessToken)
      .send({
        userType: "1",
        nickname: "슈슈",
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: -180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
      })
      .expect(400)
      .expect({ message: "INVAILD_NUMERIC" });
  });
});

describe("Check Duplicated Nickname", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users (id, kakao_id, nickname, img_url)
      VALUES (1, '12345', '중복닉네임', "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg");
    `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE users`);

    await AppDataSource.destroy();
  });

  test("SUCCESS: false case", async () => {
    await request(app)
      .post("/user/nicknameCheck")
      .send({
        nickname: "슈슈",
      })
      .expect(200)
      .expect({ message: "AVAILABLE_NICKNAME"})
  });

  test("SUCCESS: ture case", async () => {
    await request(app)
      .post("/user/nicknameCheck")
      .send({
        nickname: "중복닉네임",
      })
      .expect(200)
      .expect({ message: "DUPLICATE_NICKNAME"})
  });

  test("FALIED : KEY_ERROR", async () => {
    await request(app)
      .post("/user/nicknameCheck")
      .send({
        nickname: "",
      })
      .expect(400)
      .expect({ message: "KEY_ERROR" })
  });

 
});


