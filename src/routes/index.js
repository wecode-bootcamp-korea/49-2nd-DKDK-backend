const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const recordRouter = require("./recordRouter");

const express = require("express");

const { userHealthInfoRouter } = require("./userHealthInfoRouter");

const routes = express.Router();
const recordRouter = require("./recordRouter");

routes.use("/records", recordRouter);

module.exports = { routes };
