const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRoute } = require("./userHealthInfoRoute");
const { recordRoute } = require("./recordRoute");
const { subscriptionRoute } = require("./subscriptionRoute");
const { trainerMatchingRoute } = require("./trainerMatchingRoute");

const routes = express.Router();
routes.use("/training", trainerMatchingRoute);
routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/records", recordRoute);
routes.use("/userHealthInfo", userHealthInfoRoute);
routes.use("/subscription", subscriptionRoute);

module.exports = { routes };
