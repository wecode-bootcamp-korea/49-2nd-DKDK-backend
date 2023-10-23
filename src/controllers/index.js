const {
  createPostController,
  deletePostController,
  getAllPostController,
  createCommentController,
  deleteCommentController,
} = require("./communityControllers");

module.exports = {
  communityController: {
    createPostController,
    deletePostController,
    getAllPostController,
    createCommentController,
    deleteCommentController,
  },
};
