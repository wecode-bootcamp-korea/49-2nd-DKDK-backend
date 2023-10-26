const trainerMatchingDao = require("./trainerMatchingDao");
const userDao = require("./userDao");
const userHealthInfoDao = require("./userHealthInfoDao");
const recordDao = require("./recordDao");
const trainerQueryBuilder = require("./trainerQueryBuilder");
const subscripntionDao = require("./subscripntionDao");
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
  userDao,
  userHealthInfoDao,
  recordDao,
  subscripntionDao,
  trainerMatchingDao,
  trainerQueryBuilder,
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
