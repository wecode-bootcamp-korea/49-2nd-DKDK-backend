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

const communityRoute = express.Router();

communityRoute.get("/", getPostListController);
communityRoute.post("/post", createPostController);
communityRoute.delete("/post", deletePostController);
communityRoute.get("/post?=", getAllPostController);
communityRoute.post("/comment", createCommentController);
communityRoute.delete("/comment", deleteCommentController);
communityRoute.get("/comment", getCommentController);

module.exports = { communityRoute };
