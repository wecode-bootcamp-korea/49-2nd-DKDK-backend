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
  asyncWrap(trainerMatchingController.createTrainerProduct)
);
trainerMatchingRouter.delete(
  "/",
  asyncWrap(trainerMatchingController.deleteTrainerProduct)
);
//위의 get과 겹치게 되지 않는지
trainerMatchingRouter.get(
  "/detail/:trainerProductId",
  asyncWrap(trainerMatchingController.getTrainerProductDetail)
);

module.exports = { trainerMatchingRouter };
