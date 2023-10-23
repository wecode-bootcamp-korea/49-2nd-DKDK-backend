const express = require("express");
const { authRoute } = require("./authRoute");
const { userRoute } = require("./userRoute");
const { userHealthInfoRouter } = require("./userHealthInfoRouter");
const recordRouter = require("./recordRouter");
const express = require("express");
const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);
routes.use("/records", recordRouter);

module.exports = { routes };
