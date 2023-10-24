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
