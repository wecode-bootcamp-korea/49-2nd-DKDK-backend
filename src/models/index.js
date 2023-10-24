const {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  deleteCommentDao,
  isSubscriptDao,
  getPostlistDao,
} = require("./communityDao");

module.exports = {
  communityDao: {
    createPostDao,
    deletePostDao,
    createCommentDao,
    getAllPostDao,
    deleteCommentDao,
    isSubscriptDao,
    getPostlistDao,
  },
};
