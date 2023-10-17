const express = require("express");
const app = express();
const routes = express.Router();
const recordRouter = require("./recordRouter");

routes.use("/records", recordRouter);

// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.
module.exports = routes;
