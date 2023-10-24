const request = require("supertest");

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require("../app");
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { AppDataSource } = require("../src/models/dataSource");

describe("GET User Information", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();

    // GET 테스트를 위한 DB필수정보 생성
    // 1. workout category
    await AppDataSource.query(
      `INSERT INTO workout_categories (id, category)
      VALUES
      (1, '헬스'),
      (2, '필라테스'),
      (3, '요가');
      `
    );
    // 2. USER정보 생성
    await AppDataSource.query(
      `INSERT INTO users
      (id, nickname, birthday, gender, phone_number, user_type, height, weight, interested_workout, workout_load)
        VALUES
      (17, '테스터', '2023-10-10', 1, 01012341234, 1, 186.00, 78.00, 1, 1);
      `
    );
    // 3 - 1 . 식단데이터 생성을 위한 음식 타입 생성
    await AppDataSource.query(
      `
      INSERT INTO food_types (id, type) VALUES
      (1, '밥'),
      (2, '국'),
      (3, '메인1'),
      (4, '메인2'),
      (5, '반찬');
      `
    );
    // 3 - 2 . 식단데이터 생성을 위한 meal_plan 생성
    await AppDataSource.query(
      `
      INSERT INTO meal_plans (id, grade) VALUES
      (1, 1400),
      (2, 1600),
      (3, 1800)
      `
    );
    // 3 - 3 . 식단데이터 생생
    await AppDataSource.query(
      `
      INSERT INTO foods (id, meal_plan_id, type_id, name, kcal, weight) VALUES
      (1, 1, 1, '보리밥', 235, 140),
      (2, 1, 2, '미역쇠고기국', 35, 12),
      (3, 1, 3, '메추리알장조림', 80, 40),
      (4, 1, 4, '오이초무침', 30, 70),
      (5, 1, 5, '마늘종 볶음', 40, 25),
      (6, 2, 1, '보리밥', 235, 140),
      (7, 2, 2, '미역쇠고기국', 35, 12),
      (8, 2, 3, '메추리알장조림', 80, 40),
      (9, 2, 4, '오이초무침', 30, 70),
      (10, 2, 5, '마늘종 볶음', 40, 25),
      (11, 3, 1, '보리밥', 235, 140),
      (12, 3, 2, '미역쇠고기국', 35, 12),
      (13, 3, 3, '메추리알장조림', 80, 40),
      (14, 3, 4, '오이초무침', 30, 70),
      (15, 3, 5, '마늘종 볶음', 40, 25);
      `
    );
    // 4 - 1 . 운동루틴 생성
    await AppDataSource.query(
      `
      INSERT INTO workouts (id, category_id, name, repetition, \`set\`) VALUES
      (1, 1, 'Shoulder Press', '20회', 5);
      `
    );
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    // 테이블에 있는 데이터를 날려주는 코드
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`TRUNCATE TABLE workout_categories;`);
    await AppDataSource.query(`TRUNCATE TABLE food_types;`);
    await AppDataSource.query(`TRUNCATE TABLE meal_plans;`);
    await AppDataSource.query(`TRUNCATE TABLE foods;`);
    await AppDataSource.query(`TRUNCATE TABLE workouts;`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test("FAILED: GET - NO USER ID", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    const validAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY5ODEyMDQ3N30.dD659ouwe5jwD7jINYURXHoWpj7ZWMJRpaAzXTQx75Q"
    const res = await request(app)
      .get("/userHealthInfo")
      .set("Authorization", validAccessToken) // HTTP Method, 엔드포인트 주소를 작성합니다.
      .expect(400); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.

    expect(res.body.message).toEqual("KEY_ERROR - ID");
  });

  test("FAILED: GET - NO SUCH USER", async () => {
    const res = await request(app)
      .get("/userHealthInfo?userId=999999")
      .expect(400);

    expect(res.body.message).toEqual("KEY_ERROR_NO_SUCH_USER");
  });
});

describe("PATCH / POST - USER_INFO_UPDATE", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();

    // GET 테스트를 위한 DB필수정보 생성
    // 1. workout category
    await AppDataSource.query(
      `INSERT INTO workout_categories (id, category)
      VALUES
      (1, '헬스'),
      (2, '필라테스'),
      (3, '요가');
      `
    );

    // 2. USER정보 생성
    await AppDataSource.query(
      `INSERT INTO users
      (id, nickname, birthday, gender, phone_number, user_type, height, weight, interested_workout, workout_load)
        VALUES
      (1, '테스터', '2023-10-10', 1, 01012341234, 1, 186.00, 78.00, 1, 1);
      `
    );

    // 3 - 1 . 식단데이터 생성을 위한 음식 타입 생성
    await AppDataSource.query(
      `
      INSERT INTO food_types (id, type) VALUES
      (1, '밥'),
      (2, '국'),
      (3, '메인1'),
      (4, '메인2'),
      (5, '반찬');
      `
    );
    // 3 - 2 . 식단데이터 생성을 위한 meal_plan 생성
    await AppDataSource.query(
      `
      INSERT INTO meal_plans (id, grade) VALUES
      (1, 1400),
      (2, 1600),
      (3, 1800)
      `
    );
    // 3 - 3 . 식단데이터 생생
    await AppDataSource.query(
      `
      INSERT INTO foods (id, meal_plan_id, type_id, name, kcal, weight) VALUES
      (1, 1, 1, '보리밥', 235, 140),
      (2, 1, 2, '미역쇠고기국', 35, 12),
      (3, 1, 3, '메추리알장조림', 80, 40),
      (4, 1, 4, '오이초무침', 30, 70),
      (5, 1, 5, '마늘종 볶음', 40, 25),
      (6, 2, 1, '보리밥', 235, 140),
      (7, 2, 2, '미역쇠고기국', 35, 12),
      (8, 2, 3, '메추리알장조림', 80, 40),
      (9, 2, 4, '오이초무침', 30, 70),
      (10, 2, 5, '마늘종 볶음', 40, 25),
      (11, 3, 1, '보리밥', 235, 140),
      (12, 3, 2, '미역쇠고기국', 35, 12),
      (13, 3, 3, '메추리알장조림', 80, 40),
      (14, 3, 4, '오이초무침', 30, 70),
      (15, 3, 5, '마늘종 볶음', 40, 25);
      `
    );
    // 4 - 1 . 운동루틴 생성
    await AppDataSource.query(
      `
      INSERT INTO workouts (id, category_id, name, repetition, \`set\`) VALUES
      (1, 1, 'Shoulder Press', '20회', 5);
      `
    );

    // 5 - 1 일반유저 데이터 업데이트 하기
    
    // 5 - 2 트레이너 데이터 업데이트 하기

    // 5 - 3 유저 프로파일 이미지 업데이트

  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    // 테이블에 있는 데이터를 날려주는 코드
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`TRUNCATE TABLE workout_categories;`);
    await AppDataSource.query(`TRUNCATE TABLE food_types;`);
    await AppDataSource.query(`TRUNCATE TABLE meal_plans;`);
    await AppDataSource.query(`TRUNCATE TABLE foods;`);
    await AppDataSource.query(`TRUNCATE TABLE workouts;`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);

    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test("SUCCESS: USER INFO UPDATED", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    const res = await request(app)
      .get("/userHealthInfo") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .expect(400); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.

    expect(res.body.message).toEqual("KEY_ERROR - ID");
  });

  test("SUCCESS: TRAINER INFO UPDATED", async () => {
    const res = await request(app)
      .get("/userHealthInfo?userId=999999")
      .expect(400);

    expect(res.body.message).toEqual("KEY_ERROR_NO_SUCH_USER");
  });

  // 다음과 같이 본인이 작성한 코드에 맞춰 다양한 케이스를 모두 테스트해야 합니다.
  // 그래야 의도에 맞게 코드가 잘 작성되었는지 테스트 단계에서부터 확인할 수 있습니다!
  test("SUCCESS: PROFILE IMG UPLOADED", async () => {
    const res = await request(app).get(`/userHealthInfo?userId=1&workoutRcmdId=1`);
    expect(200);
    expect(res.body.message).toEqual("MYPAGE_LOADED");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual({
      userInfo: [{
               "height": "186",
               "interested_workout": "헬스",
               "nickname": "테스터",
               "profileImage": null,
               "subEndDate": "false",
               "weight": "78",
             }],
      trainerInfo: "NOT_A_TRAINER",
      ptOrderInfo: "NO_PT_ORDERS",
      subOrderInfo: "NO_SUB_ORDERS",
      foodRcmd: [{
          "id": 3,
          "mealPlan": [
            { 
              "imgUrl": null,
              "kcal": 235,
              "name": "보리밥",
              "typeId": 1,
              "weight": 140,
            },
            {
              "imgUrl": null,
              "kcal": 35,
              "name": "미역쇠고기국",
              "typeId": 2,
              "weight": 12,
            },
            {
              "imgUrl": null,
              "kcal": 80,
              "name": "메추리알장조림",
              "typeId": 3,
              "weight": 40,
            },
            {
              "imgUrl": null,
              "kcal": 30,
              "name": "오이초무침",
              "typeId": 4,
              "weight": 70,
            },
            {
              "imgUrl": null,
              "kcal": 40,
              "name": "마늘종 볶음",
              "typeId": 5,
              "weight": 25,
            }
          ]
      }],
      workoutRcmd: [{
               "category": "헬스",
               "category_id": 1,
               "id": 1,
               "img_url": null,
               "name": "Shoulder Press",
               "repetition": "20회",
               "set": 5,
              }]
    });
  });

  test("SUCCESS: POST - USER_INFO_UPDATED", async () => {
  })

  test("SUCCESS: POST - USER_INFO_UPDATED", async () => {
  })

  test("SUCCESS: POST - USER_INFO_UPDATED", async () => {
  })

  test("SUCCESS: POST - USER_INFO_UPDATED", async () => {
  })

  test("SUCCESS: POST - USER_INFO_UPDATED", async () => {
  })
});
