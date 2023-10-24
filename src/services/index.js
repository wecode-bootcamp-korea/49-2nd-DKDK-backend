const {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
  getPostListService,
  getCommentService,
} = require("./communityServices");

module.exports = {
  communityService: {
    createPostService,
    deletePostService,
    createCommentService,
    getAllPostService,
    deleteCommentService,
    getPostListService,
    getCommentService,
  },
};
