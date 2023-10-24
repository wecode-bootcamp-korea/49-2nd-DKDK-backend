const request = require("supertest");
const nock = require("nock");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("SubscriptionPayment Success", () => {
  let app;
  let userId;
  let accessToken;
  const mockedImpUid = "mocked_imp_uid"

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();

    const user = await AppDataSource.query(`
      INSERT INTO users (id, kakao_id, user_type, img_url)
      VALUES (77, '12345784', '1', "https://img.allurekorea.com/allure/2020/12/style_5fdf11d599bdd-916x1200.jpg");
    `);

    userId = user.insertId;
    accessToken = jwt.sign({ id: userId }, process.env.SECRET);

    await AppDataSource.query(`
      INSERT INTO subscriptions (price, term)
      VALUES (10000, 1);
    `);

    await AppDataSource.query(`
     INSERT INTO subscriptions (price, term)
     VALUES (20000, 1);
    `);

    nock("https://api.iamport.kr")
      .post("/users/getToken", {
            
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET
      })
      .matchHeader("accept", "application/json, text/plain, */*")
      .matchHeader("content-type", "application/json")
      .matchHeader("user-agent", "axios/1.5.1")
      .reply(200, { response: { access_token: "mocked_access_token" } });

    nock('https://api.iamport.kr')
      .get(`/payments/${mockedImpUid}`)
      .matchHeader("authorization", "mocked_access_token")
      .reply(200, {
        response: { amount: 10000, name: 'DKDK 커뮤니티 1개월 구독권(회원)' },
      });
  });

  afterAll(async () => {
    await AppDataSource.query(`SET foreign_key_checks = 0;`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE subscriptions`)
    await AppDataSource.query(`TRUNCATE sub_orders`)
    
    await AppDataSource.destroy();
  });

  test("SUCCESS: PAYMENT_SUCCESS ", async () => {
   
    const response = await request(app)
      .post("/subscription")
      .set("Authorization", accessToken)
      .send({ imp_uid: mockedImpUid })
      .expect(200);

    expect(response.body.message).toBe("PAYMENT_SUCCESS");
  });
});