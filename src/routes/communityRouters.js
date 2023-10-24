const express = require("express");
const { communityController } = require("../controllers");

const {
  getAllPostController,
  createPostController,
  deletePostController,
  createCommentController,
  deleteCommentController,
} = communityController;

const router = express.Router();

router.get("/", getAllPostController);

router.post("/post/:userId", createPostController);
router.delete("/post/:postId/:userId", deletePostController);
router.get("/post?=");
router.post("/comment/:userId/:postId", createCommentController);
router.delete("/comment/:userId/:postId", deleteCommentController);

module.exports = router;
