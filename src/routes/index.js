const express = require("express");
const { trainerMatchingController } = require("../controllers");

const routes = express.Router();

const trainerMatchingController = require("./trainerMatchingRoute");
// try-catch문에 대해서 err catch 해주는 부분이 라우터 단에서 필요하다.
routes.use("/trainer", trainerMatchingController);

module.exports = { routes };
