const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const { trainerMatchingRouter } = require("./trainerMatchingRoute");

const routes = express.Router();
routes.use("/training", trainerMatchingRouter);
routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/userHealthInfo", userHealthInfoRouter);

module.exports = { routes };
