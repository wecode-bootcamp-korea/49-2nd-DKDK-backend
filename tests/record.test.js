// // tests/user.test.js

// // npm i --save-dev supertest
// const request = require("supertest");
// const nock = require("nock");

// // supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
// const { createApp } = require("../app");
// // DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
// const { AppDataSource } = require("../src/models/dataSource");

// describe("read Records", () => {
//   let app;
//   const mockedId = "1";
//   const mockedImgUrl = "https://example.com/profile_image.jpg";
//   const mockedAccessToken = "mocked_access_token";

//   beforeAll(async () => {
//     // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
//     app = createApp();
//     await AppDataSource.initialize().then();

//     nock("https://kauth.kakao.com")
//     .post("/oauth/token")
//     .reply(200, {
//       access_token: mockedAccessToken,
//     });

//     nock("https://kapi.kakao.com")
//       .get("/v2/user/me")
//       .query({
//         access_token: mockedAccessToken,
//       })
//       .reply(200, {
//         id: mockedId,
//         properties: {
//           profile_image: mockedImgUrl,
//         },
//       });

//       await AppDataSource.query(`
//       INSERT INTO users (kakao_id, img_url, user_type)
//       VALUES ('${mockedId}', '${mockedImgUrl}', 1);
//       `);

//     //필요한 운동기록 데이터를 생성합니다.  
//     await AppDataSource.query(`
//         UPDATE users
//         SET
//             nickname = '아무개',
//             birthday = '1994-04-12',
//             gender = 'Male',
//             phone_number = 1072231234,
//             height = 180.00,
//             weight = 75.00,
//             img_url = 'http://k.kakaocdn.net/dn/mIPLJ/btsrYVlrGgO/0nvRL8xGC8ROQd8t5MPG6k/img_640x640.jpg'
//         WHERE id = 1;
//     `)
//        //유저 정보를 생성합니다.  
//     await AppDataSource.query(`
//         INSERT INTO workout_records (
//             user_id, 
//             water_content, 
//             workout_time, 
//             current_weight, 
//             muscle_mass, 
//             body_fat, 
//             max_heartrate, 
//             created_at) VALUES 
//         (1, 26, 0.5, 79.1, 33, 40.10, 169, '2023-10-01 00:00:00'),
//         (1, 24, 1, 74.2, 34, 41.87, 187, '2023-10-02 00:00:00'),
//         (1, 23, 0.5, 76, 35, 43.75, 149, '2023-10-03 00:00:00'),
//         (1, 22, 1, 79, 38, 48.10, 181, '2023-10-04 00:00:00'),
//         (1, 21, 1.5, 76, 39, 51.32, 186, '2023-10-05 00:00:00'),
//         (1, 27, 1, 73, 40, 54.79, 183, '2023-10-06 00:00:00'),
//         (1, 30, 2, 71, 41, 57.75, 182, '2023-10-07 00:00:00');
//     `)
//   });

//   test("SUCCESS: Able to read the user record", async () => {
//     await request(app)
//     .get("/records")
//     .set("Authorization", mockedAccessToken)
//     .expect(200);
//     });

//   afterAll(async () => {
//     // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
//     await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
//     await AppDataSource.query(`TRUNCATE TABLE users;`);
//     await AppDataSource.query(`TRUNCATE TABLE workout_categories;`);
    
//     // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
//     await AppDataSource.destroy();
    
//   });


// });
