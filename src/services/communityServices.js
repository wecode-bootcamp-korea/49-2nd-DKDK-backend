const { communityDao } = require("../models");
const { createPostDao, getPostDao, deletePostDao, createCommentDao } =
  communityDao;

const getPostService = async (userId, postId) => {
  return getPostDao(userId, postId);
};

const createPostService = async (userId, content, img_url) => {
  createPostDao(userId, content, img_url);
  return "POST_CREATE";
};

const deletePostService = async (userId, postId) => {
  deletePostDao(userId, postId);
  return "POST_DELETE";
};

const createCommentService = async (userId, postId, content) => {
  createCommentDao(userId, postId, content);
  return "COMMMENT_CREATE";
};

module.exports = {
  getPostService,
  createPostService,
  deletePostService,
  createCommentService,
};
