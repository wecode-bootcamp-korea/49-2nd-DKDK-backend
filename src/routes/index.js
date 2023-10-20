const express = require("express");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const { trainerMatchingRouter } = require("./trainerMatchingRoute");

const routes = express.Router();
routes.use("/trainer", trainerMatchingRouter);
routes.use("/userHealthInfo", userHealthInfoRouter);

module.exports = { routes };
