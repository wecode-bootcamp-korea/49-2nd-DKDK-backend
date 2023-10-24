const {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  deleteCommentDao,
  isSubscriptDao,
  getPostlistDao,
  getCommentDao,
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
    getCommentDao,
  },
};
