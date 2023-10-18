const {
  getPostController,
  createPostController,
  deletePostController,
} = require("./communityControllers");

module.exports = {
  communityController: {
    getPostController,
    createPostController,
    deletePostController,
  },
};
