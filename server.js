require("dotenv").config();

const { createApp } = require("./app");
const { AppDataSource } = require("./src/models/dataSource");

//server test
app.get("/ping", async (req, res) => {
  return res.status(200).json({ message: "pong" });
});

// 서버를 시작하는 함수
const start = async () => {
  const app = createApp();
  const port = process.env.PORT;

  await AppDataSource.initialize().then(() =>
    console.log("Datasource initialized.")
  );

  app.listen(port || 8000, () => {
    console.log(`server is running at ${app.get("port")}`);
  });
};

start();
