const express = require("express");

const { trainerMatchingController } = require("../controllers");
const { asyncWrap } = require("../middlewares/errorHandler");
const { validateToken } = require("../middlewares/auth");

const trainerMatchingRoute = express.Router();

trainerMatchingRoute.get(
  "/",
  validateToken,
  asyncWrap(trainerMatchingController.getTrainerProduct)
);
trainerMatchingRoute.post(
  "/",
  validateToken,
  asyncWrap(trainerMatchingController.createTrainerProduct)
);
trainerMatchingRoute.post(
  "/delete",
  validateToken,
  asyncWrap(trainerMatchingController.deleteTrainerProduct)
);
//위의 get과 겹치게 되지 않는지
trainerMatchingRoute.get(
  "/detail",
  validateToken,
  asyncWrap(trainerMatchingController.getTrainerProductDetail)
);

module.exports = { trainerMatchingRoute };
