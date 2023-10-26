const request = require("supertest");

const { createApp } = require("../app");

const { AppDataSource } = require("../src/models/dataSource");

describe("community", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await AppDataSource.query(`TRUNCATE users`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });
  //게시물이 없을경우
  test("FAILED: GetALlPost", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .get("/community/?userId=7") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: "NO_POST" });
  });

  test("SUCCESS: GetAllPost", async () => {
    await request(app).get("/community/?userId=2&postId=2").expect(200);
    expect({ message: "GET_POST" });
  });

  test("FAILED: createPost", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/community/post/1") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: "NO_CONTENT" });
  });
  test("FAILED: createPost", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app);
    post("/community/post/2"); // HTTP Method, 엔드포인트 주소를 작성합니다.
    send({ content: "테스트정말싫다", img_url: "null" })
      .expect(200) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({
        message: "CREATE_POST",
        data: {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 1,
          serverStatus: 2,
          warningCount: 0,
          message: "",
          protocol41: true,
          changedRows: 0,
        },
      });
  });
});
=======
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
      INSERT INTO users (id, kakao_id, img_url)
      VALUES (99, '12345', "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg");
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
      VALUES (100, '12345', '중복닉네임', "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg");
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


