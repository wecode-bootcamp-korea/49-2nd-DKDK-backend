const recordController = require("../controllers/recordController");
// const auth = require("../middlewares");
const express = require("express");

const recordRouter = express.Router(); //라우터를 시작합니다.

const createRecord = recordController.createRecord;
const readRecord = recordController.readRecord;

recordRouter.post("/", recordController.createRecord);
recordRouter.get("/:id", recordController.readRecord);

// recordRouter.post("/", auth, recordController.createRecord);
// recordRouter.get("/:id", validateToken, recordController.readRecord);


module.exports = recordRouter;
