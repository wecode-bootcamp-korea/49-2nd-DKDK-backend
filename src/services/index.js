const {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
  getPostListService,
} = require("./communityServices");

module.exports = {
  communityService: {
    createPostService,
    deletePostService,
    createCommentService,
    getAllPostService,
    deleteCommentService,
    getPostListService,
  },
};
