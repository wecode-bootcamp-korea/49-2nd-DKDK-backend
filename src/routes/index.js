const express = require("express");
const { trainerMatchingRouter } = require("./trainerMatchingRoute");

const routes = express.Router();

routes.use("/trainer", trainerMatchingRouter);

module.exports = { routes };
