const express = require("express");
const routes = express.Router();
const recordRouter = require("./recordRouter");

routes.use("/records", recordRouter);

module.exports = { routes };
