const express = require("express");

const { trainerMatchingController } = require("../controllers");
const { asyncWrap } = require("../middlewares/errorHandler");

const trainerMatchingRouter = express.Router();

trainerMatchingRouter.get(
  "/",
  asyncWrap(trainerMatchingController.getTrainerProduct)
);
// trainerMatchingRouter.post("/");
// trainerMatchingRouter.delete("/");

module.exports = { trainerMatchingRouter };
