const {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
} = require("./communityServices");

module.exports = {
  communityService: {
    createPostService,
    deletePostService,
    createCommentService,
    getAllPostService,
    deleteCommentService,
  },
};
