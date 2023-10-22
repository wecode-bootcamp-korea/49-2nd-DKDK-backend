const express = require("express");

const { trainerMatchingController } = require("../controllers");
const { asyncWrap } = require("../middlewares/errorHandler");

const trainerMatchingRouter = express.Router();

trainerMatchingRouter.get(
  "/",
  asyncWrap(trainerMatchingController.getTrainerProduct)
);
trainerMatchingRouter.post(
  "/",
  asyncWrap(trainerMatchingController.postTrainerProduct)
);
trainerMatchingRouter.delete(
  "/",
  asyncWrap(trainerMatchingController.deleteTrainerProduct)
);
trainerMatchingRouter.get(
  "/detail",
  asyncWrap(trainerMatchingController.getTrainerProduct)
);

module.exports = { trainerMatchingRouter };
