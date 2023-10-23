const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");

const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/userHealthInfo", userHealthInfoRouter);

module.exports = { routes };
