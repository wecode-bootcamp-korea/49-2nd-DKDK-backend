const {
  createPostController,
  deletePostController,
  getAllPostController,
  createCommentController,
  deleteCommentController,
  getPostListController,
} = require("./communityControllers");

module.exports = {
  communityController: {
    createPostController,
    deletePostController,
    getAllPostController,
    createCommentController,
    deleteCommentController,
    getPostListController,
  },
};
