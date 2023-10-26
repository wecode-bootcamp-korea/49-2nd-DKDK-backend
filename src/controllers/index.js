const trainerMatchingController = require("./trainerMatchingController");
const authController = require("./authController");
const userController = require("./userController");
const userHealthInfoController = require("./userHealthInfoController");
const readController = require("./recordController");
const subscriptionController = require("./subscriptionController");
const {
  createPostController,
  deletePostController,
  getAllPostController,
  createCommentController,
  deleteCommentController,
  getPostListController,
  getCommentController,
} = require("./communityControllers");

module.exports = {
  authController,
  userController,
  userHealthInfoController,
  readController,
  subscriptionController,
  trainerMatchingController,
  communityController: {
    createPostController,
    deletePostController,
    getAllPostController,
    createCommentController,
    deleteCommentController,
    getPostListController,
    getCommentController,
  },
};
