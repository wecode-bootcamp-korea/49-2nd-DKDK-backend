const express = require("express");

const routes = express.Router();
const { adminRouter } = require("./adminRouter");
// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.

routes.use("/admin", adminRouter);

module.exports = { routes };
