const {
  createPostDao,
  getPostDao,
  deletePostDao,
  createCommentDao,
} = require("./communityDao");

module.exports = {
  communityDao: {
    createPostDao,
    getPostDao,
    deletePostDao,
    createCommentDao,
  },
};
