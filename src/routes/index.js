const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const { subscriptionRoute } = require("./subscriptionRoute")

const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/userHealthInfo", userHealthInfoRouter);
routes.use("/subscription", subscriptionRoute)

module.exports = { routes };
