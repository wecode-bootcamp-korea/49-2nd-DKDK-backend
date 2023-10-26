const { throwError } = require("../utils/throwError");
const { communityDao } = require("../models");
const { deleteCommentDao } = require("../models/communityDao");
const {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  isSubscriptDao,
  getPostlistDao,
  getCommentDao,
} = communityDao;

const deletePostService = async (userId, postId) => {
  return await deletePostDao(userId, postId);
};

const deleteCommentService = async (postId, commentId) => {
  await deleteCommentDao(postId, commentId);
};

const getAllPostService = async (userId, postId) => {
  return await getAllPostDao(userId, postId);
};

const getPostListService = async (userId) => {
  return await getPostlistDao(userId);
};
const getCommentService = async (userId, postId) => {
  return await getCommentDao(userId, postId);
};

const createPostService = async (userId, content, img_url) => {
  const checkSubscript = await isSubscriptDao(userId);
  if (checkSubscript === "false") throwError(400, "NOT_SUBSCRIBER");
  return await createPostDao(userId, content, img_url);
};

const createCommentService = async (userId, content, postId) => {
  const checkSubscript = await isSubscriptDao(userId);
  if (checkSubscript === "false") throwError(400, "NOT_SUBSCRIBER");
  return await createCommentDao(userId, content, postId);
};

module.exports = {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
  getPostListService,
  getCommentService,
};
