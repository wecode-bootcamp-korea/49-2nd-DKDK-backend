const express = require("express");

const { adminController } = require("../controllers");

const adminRouter = express.Router();

adminRouter.post("/login", adminController.logIn);
adminRouter.post("/signup", adminController.signUp);

module.exports = { adminRouter };
