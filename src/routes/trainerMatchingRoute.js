const express = require("express");

const { trainerMatchingController } = require("../controllers");
// cosnt {} =require("../middlewares") 미들웨어 merge후 추가

const trainerMatchingRouter = express.Router();

trainerMatchingRouter.get("/", trainerMatchingController.getTrainerProduct);
trainerMatchingRouter.post("/");
trainerMatchingRouter.delete("/");

module.exports = { trainerMatchingRouter };
