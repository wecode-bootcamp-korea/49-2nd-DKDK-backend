const userServicve = require("./userService");
const userHealthInfoService = require("./userHealthInfoService");
const recordService = require("./recordService");
const trainerMatchingService = require("./trainerMatchingService");
const subscriptionService = require("./subscriptionService");
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
  userServicve,
  userHealthInfoService,
  recordService,
  subscriptionService,
  trainerMatchingService,
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
