const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const routes = express.Router();
// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.

routes.use("/auth", authRoute);
routes.use("/user", userRoute);

module.exports = { routes };
