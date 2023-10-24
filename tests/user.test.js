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
