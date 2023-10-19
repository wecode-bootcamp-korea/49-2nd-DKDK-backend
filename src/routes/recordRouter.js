const recordController = require("../controllers/recordController");
const validateToken = require("../middlewares/auth.js");
const { throwError } = require("../utils");
const express = require("express");

const recordRouter = express.Router(); //라우터를 시작합니다.

const createRecord = recordController.createRecord;
const readRecord = recordController.readRecord;

recordRouter.post("/", validateToken, recordController.createRecord);
recordRouter.get("/:id", validateToken, recordController.readRecord);

//라우터에 토큰확인 미들웨어를 추가해야함

module.exports = recordRouter;
