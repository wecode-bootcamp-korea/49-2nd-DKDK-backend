const express = require("express");

const userHealthInfoRouter = require("./userHealthInfoRouter");

const routes = express.Router();
// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.

routes.use("/userHealthInfo", userHealthInfoRouter);

module.exports = { routes };
