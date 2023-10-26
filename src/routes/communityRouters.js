const express = require("express");
const { communityController } = require("../controllers");
const { getCommentController } = require("../controllers/communityControllers");

const {
  getAllPostController,
  createPostController,
  deletePostController,
  createCommentController,
  deleteCommentController,
  getPostListController,
} = communityController;

const router = express.Router();

router.get("/", getPostListController);
router.post("/post", createPostController);
router.delete("/post", deletePostController);
router.get("/post?=", getAllPostController);
router.post("/comment", createCommentController);
router.delete("/comment", deleteCommentController);
router.get("/comment", getCommentController);

module.exports = router;
