const {
  createPostController,
  deletePostController,
  getAllPostController,
  createCommentController,
  deleteContnetController,
} = require("./communityControllers");

module.exports = {
  communityController: {
    createPostController,
    deletePostController,
    getAllPostController,
    createCommentController,
    deleteContnetController,
  },
};
