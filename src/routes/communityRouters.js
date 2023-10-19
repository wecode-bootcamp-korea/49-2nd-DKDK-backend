const express = require("express");
const { communityController } = require("../controllers");

const {
  getAllPostController,
  createPostController,
  deletePostController,
  createCommentController,
  deleteContnetController,
} = communityController;

const router = express.Router();

router.get("/", getAllPostController);
router.post("/like");
router.post("/", createPostController);
router.delete("/post?=", deletePostController);
router.get("/post?=");
router.post("/comment", createCommentController);
router.delete("/comment", deleteContnetController);

module.exports = router;
