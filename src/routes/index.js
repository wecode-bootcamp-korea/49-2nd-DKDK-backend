const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const recordRouter = require("./recordRouter");
const express = require("express");
const routes = express.Router();

routes.use("/records", recordRouter);

module.exports = { routes };
