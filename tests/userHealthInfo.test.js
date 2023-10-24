const request = require("supertest");
const { generateToken } = require("../src/utils/generateToken");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("TEST 1.GET USER INFO ", () => {
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

  test("1. GET SUCCESS - USER INFO LOADED", async () => {
    const validAccessToken = generateToken(1);
    const res = await request(app)
      .get("/userHealthInfo?workoutRcmdId=1")
      .set("Authorization", validAccessToken)
      .expect(200);
    expect(res.body.message).toEqual("MYPAGE_LOADED");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual({
      userInfo: [
        {
          birthday: "2023-10-10",
          gender: "1",
          height: "186.00",
          interested_workout: "헬스",
          nickname: "테스터",
          profileImg: null,
          phoneNumber: 1012341234,
          subEndDate: "false",
          weight: "78.00",
          workoutLoad: "상",
        },
      ],
      trainerInfo: "NOT_A_TRAINER",
      ptOrderInfo: "NO_PT_ORDERS",
      subOrderInfo: "NO_SUB_ORDERS",
      foodRcmd: [
        {
          id: 3,
          mealPlan: [
            {
              imgUrl: null,
              kcal: 235,
              name: "보리밥",
              typeId: 1,
              weight: 140,
            },
            {
              imgUrl: null,
              kcal: 35,
              name: "미역쇠고기국",
              typeId: 2,
              weight: 12,
            },
            {
              imgUrl: null,
              kcal: 80,
              name: "메추리알장조림",
              typeId: 3,
              weight: 40,
            },
            {
              imgUrl: null,
              kcal: 30,
              name: "오이초무침",
              typeId: 4,
              weight: 70,
            },
            {
              imgUrl: null,
              kcal: 40,
              name: "마늘종 볶음",
              typeId: 5,
              weight: 25,
            },
          ],
        },
      ],
      workoutRcmd: [
        {
          category: "헬스",
          category_id: 1,
          id: 1,
          img_url: null,
          name: "Shoulder Press",
          repetition: "20회",
          set: 5,
        },
      ],
    });
  });

  test("2. GET FAILED - NO SUCH USER", async () => {
    const validAccessToken = generateToken(17);
    const res = await request(app)
      .get("/userHealthInfo")
      .set("Authorization", validAccessToken)
      .expect(400);

    expect(res.body.message).toEqual("NO_SUCH_USER");
  });

  test("3. GET SUCCESS - MODIFYING INFO LOADED", async () => {
    const validAccessToken = generateToken(1);
    const res = await request(app)
      .get("/userHealthInfo/update")
      .set("Authorization", validAccessToken)
      .expect(200);
    expect(res.body.message).toEqual("TOBE_UPDATED_INFO_LOADED");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual([
      {
        birthday: "2023-10-10",
        gender: "1",
        height: "186.00",
        imgUrl: null,
        interestedWorkout: 1,
        nickname: "테스터",
        specialized: null,
        userId: 1,
        userType: 1,
        weight: "78.00",
        workoutLoad: 1,
      },
    ]);
  });
});

describe("TEST 2. USER INFO UPDATE", () => {
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
    // 2. 업데이트할 일반 유저
    await AppDataSource.query(
      `INSERT INTO users
      (id, nickname, birthday, gender, phone_number, user_type, height, weight, interested_workout, workout_load)
        VALUES
      (1, '테스터', '2023-10-10', 1, 01012341234, 1, 186.00, 78.00, 1, 1);
      `
    );
    // 3. 업데이트 할 트레이너 유저
    await AppDataSource.query(
      `INSERT INTO users
      (id, nickname, birthday, gender, phone_number, user_type, height, weight, interested_workout, workout_load)
        VALUES
      (2, '약한트레이너', '2023-10-10', 1, 01045678901, 2, 170.00, 78.00, 1, 1);
      `
    );
    await AppDataSource.query(
      `
      INSERT INTO trainers (id, user_id, specialized)
      VALUES (1, 2, 1);
      `
    );
  });
  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    // 테이블에 있는 데이터를 날려주는 코드
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE TABLE users;`);
    await AppDataSource.query(`TRUNCATE TABLE trainers;`);
    await AppDataSource.query(`TRUNCATE TABLE workout_categories;`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test("1. SUCCESS - POST USER INFO UPDATED", async () => {
    const validAccessToken = generateToken(1);
    console.log(validAccessToken);
    const res = await request(app)
      .patch("/userHealthInfo") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .set("Authorization", validAccessToken)
      .send({
        "gender": 1,
        "birthday" : "1990-09-27",
        "height": 170.10,
        "weight": 45.45,
        "workoutLoad": 1,
        "interestedWorkout": 1,
        "specialized": 1
        })
      expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.

    expect(res.body.message).toEqual("USER_INFO_UPDATED");
    expect(res.body.data).toEqual("DATA_UPDATED");
  });
});
