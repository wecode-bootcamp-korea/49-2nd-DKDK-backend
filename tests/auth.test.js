// const request = require("supertest");
// const nock = require("nock");
// const { createApp } = require("../app");
// const { AppDataSource } = require("../src/models/dataSource");

// describe("KakaoStrategy : NEW_USER ", () => {
//     let app;
//     const mockedId = "999999999";
//     const mockedImgUrl = "https://example.com/profile_image.jpg";
//     const mockedAccessToken = "mocked_access_token";
  
//     beforeAll(async () => {
//       app = createApp();
//       await AppDataSource.initialize();
  
//       nock("https://kauth.kakao.com")
//       .post("/oauth/token")
//       .reply(200, {
//         access_token: mockedAccessToken,
//       });
  
//       nock("https://kapi.kakao.com")
//         .get("/v2/user/me")
//         .query({
//           access_token: mockedAccessToken,
//         })
//         .reply(200, {
//           id: mockedId,
//           properties: {
//             profile_image: mockedImgUrl,
//           },
//         });
//     });
  
//     afterAll(async () => {
//       await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
//       await AppDataSource.query(`TRUNCATE users`);
  
//       await AppDataSource.destroy();
//     });
  
//      test("SUCCESS: login existing user ", async () => {
//        const response = await request(app)
//        .get("/auth/kakao/callback")
//        .query({ code: "mocked_kakao_code" })
//        .expect(200);
  
//        expect(response.body.message).toBe("NEW_USER");
//        expect(response.body.statusCode).toBe(201);
//        expect(response.body.token).toBeDefined(); 
//      });
  
//     });

// describe("KakaoStrategy : NEW_USER but Signup", () => {
//   let app;
//   const mockedId = "999999999";
//   const mockedImgUrl = "https://example.com/profile_image.jpg";
//   const mockedAccessToken = "mocked_access_token";

//   beforeAll(async () => {
//     app = createApp();
//     await AppDataSource.initialize();

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
//       INSERT INTO users (kakao_id, img_url)
//       VALUES ('${mockedId}', '${mockedImgUrl}');
//       `);

//   });

//   afterAll(async () => {
//     await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
//     await AppDataSource.query(`TRUNCATE users`);

//     await AppDataSource.destroy();
//   });

//    test("SUCCESS: login existing user ", async () => {
//      const response = await request(app)
//      .get("/auth/kakao/callback")
//      .query({ code: "mocked_kakao_code" })
//      .expect(200);

//      expect(response.body.message).toBe("NEW_USER");
//      expect(response.body.statusCode).toBe(201);
//      expect(response.body.token).toBeDefined(); 
//    });

//   });

// describe("KakaoStrategy : LOGIN_SUCCESS", () => {
//     let app;
//     const mockedId = "999999999";
//     const mockedImgUrl = "https://example.com/profile_image.jpg";
//     const mockedAccessToken = "mocked_access_token";
  
//     beforeAll(async () => {
//       app = createApp();
//       await AppDataSource.initialize();
  
//       nock("https://kauth.kakao.com")
//       .post("/oauth/token")
//       .reply(200, {
//         access_token: mockedAccessToken,
//       });
  
//       nock("https://kapi.kakao.com")
//         .get("/v2/user/me")
//         .query({
//           access_token: mockedAccessToken,
//         })
//         .reply(200, {
//           id: mockedId,
//           properties: {
//             profile_image: mockedImgUrl,
//           },
//         });

//         await AppDataSource.query(`
//         INSERT INTO users (kakao_id, img_url, user_type)
//         VALUES ('${mockedId}', '${mockedImgUrl}', 1);
//         `);

//     });
  
//     afterAll(async () => {
//       await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
//       await AppDataSource.query(`TRUNCATE users`);
  
//       await AppDataSource.destroy();
//     });
  
//      test("SUCCESS: login existing user ", async () => {
//        const response = await request(app)
//        .get("/auth/kakao/callback")
//        .query({ code: "mocked_kakao_code" })
//        .expect(200);
  
//        expect(response.body.message).toBe("LOGIN_SUCCESS");
//        expect(response.body.statusCode).toBe(200);
//        expect(response.body.token).toBeDefined(); 
//        expect(response.body.userType).toBeDefined(); 
//        expect(response.body.isSubscribed).toBeDefined(); 
//      });
  
//     });


  

