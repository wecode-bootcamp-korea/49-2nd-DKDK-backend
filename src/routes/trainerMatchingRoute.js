const express = require("express");

const { trainerMatchingController } = require("../controllers");
const { asyncWrap } = require("../middlewares/errorHandler");
const { validateToken } = require("../middlewares/auth");

const trainerMatchingRouter = express.Router();

trainerMatchingRouter.get(
  "/",
  validateToken,
  asyncWrap(trainerMatchingController.getTrainerProduct)
);
trainerMatchingRouter.post(
  "/",
  validateToken,
  asyncWrap(trainerMatchingController.createTrainerProduct)
);
trainerMatchingRouter.delete(
  "/",
  validateToken,
  asyncWrap(trainerMatchingController.deleteTrainerProduct)
);
//위의 get과 겹치게 되지 않는지
trainerMatchingRouter.get(
  "/detail",
  validateToken,
  asyncWrap(trainerMatchingController.getTrainerProductDetail)
);

module.exports = { trainerMatchingRouter };
