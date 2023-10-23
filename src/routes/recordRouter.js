const recordController = require("../controllers/recordController");
const { asyncWrap } = require("../middlewares/errorHandler");
const { validateToken } = require("../middlewares/auth");
const express = require("express");

const recordRouter = express.Router(); //라우터를 시작합니다.

const createRecord = recordController.createRecord;
const readRecord = recordController.readRecord;

recordRouter.post("/", validateToken, recordController.createRecord);
recordRouter.get("/", validateToken, recordController.readRecord);

module.exports = recordRouter;
