const express = require("express");
const { communityController } = require("../controllers");

const { getPostController, createPostController, deletePostController } =
  communityController;

const router = express.Router();

router.get("/", getPostController);
router.post("/like");
router.post("/", createPostController);
router.delete("/post?=", deletePostController);
router.get("/post?=");
router.post("/comment");
router.delete("/comment");

module.exports = router;
