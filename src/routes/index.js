const express = require("express");

const { userHealthInfoRouter } = require("./userHealthInfoRouter");

const routes = express.Router();

routes.use("/userHealthInfo", userHealthInfoRouter);

module.exports = { routes };
