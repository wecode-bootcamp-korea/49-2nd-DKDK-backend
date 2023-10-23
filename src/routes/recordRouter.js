const recordController = require("../controllers/recordController");
const { asyncWrap } = require("../middlewares/errorHandler")
// const auth = require("../middlewares");
const express = require("express");

const recordRouter = express.Router(); //라우터를 시작합니다.

const createRecord = recordController.createRecord;
const readRecord = recordController.readRecord;

recordRouter.post("/", asyncWrap(recordController.createRecord));
recordRouter.get("/:id", asyncWrap(recordController.readRecord));

// recordRouter.post("/", auth, recordController.createRecord);
// recordRouter.get("/:id", validateToken, recordController.readRecord);


module.exports = recordRouter;
