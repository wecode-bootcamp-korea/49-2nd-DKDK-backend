const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const { recordRouter } = require("./recordRouter");
const { subscriptionRoute } = require("./subscriptionRoute");
const { trainerMatchingRouter } = require("./trainerMatchingRoute");
const {communityRouter} = require("./communityRouters");

const routes = express.Router();

routes.use("/community", communityRouter);
routes.use("/training", trainerMatchingRouter);
routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/records", recordRouter);
routes.use("/userHealthInfo", userHealthInfoRouter);
routes.use("/subscription", subscriptionRoute);

module.exports = { routes };
