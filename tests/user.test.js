const request = require("supertest");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

//jest.setTimeout(10000); // 10 seconds

describe("Sign up", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(`
      INSERT INTO users (id, kakao_id)
      VALUES (1, '12345');
    `);
    await AppDataSource.query(`
    INSERT INTO users (id, kakao_id)
      VALUES (2, '12346');
    `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE trainers`);

    await AppDataSource.destroy(); // 연결 끊기
  });

  test("FALIED : KEY_ERROR", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        userId: 1,
        userType: 1,
        imgUrl: "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg",
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
      .send({
        userId: 1,
        userType: 5,
        imgUrl: "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg",
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

  test("SUCCESS: update user", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        userId: 1,
        userType: 1,
        imgUrl: "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg",
        nickname: "슈슈",
        phoneNumber: "01072925164",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
      })
      .expect(200);
  });

  test("SUCCESS: insert trainer", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        userId: 2,
        userType: 2,
        imgUrl: "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg",
        nickname: "슈슈슈",
        phoneNumber: "01072925169",
        gender: "남성",
        birthday: "1990/03/26",
        height: 180,
        weight: 70,
        interestedWorkout: 1,
        workoutLoad: 1,
        specialized: 1,
      })
      .expect(200);
  });
});
