const express = require("express");

const routes = express.Router();
const { adminRouter } = require("./adminRouter");

routes.use("/admin", adminRouter);

module.exports = { routes };
