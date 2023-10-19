const {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  deleteCommentDao,
  isSubscriptDao,
} = require("./communityDao");

module.exports = {
  communityDao: {
    createPostDao,
    deletePostDao,
    createCommentDao,
    getAllPostDao,
    deleteCommentDao,
    isSubscriptDao,
  },
};
