const {
  getPostService,
  createPostService,
  deletePostService,
  createCommentService,
} = require("./communityServices");

module.exports = {
  communityService: {
    getPostService,
    createPostService,
    deletePostService,
    createCommentService,
  },
};
