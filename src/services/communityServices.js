const { throwError } = require("../utils/throwError");
const { communityDao } = require("../models");
const { deleteCommentDao } = require("../models/communityDao");
const {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  isSubscriptDao,
} = communityDao;

const deletePostService = async (userId, postId) => {
  await deletePostDao(userId, postId);
  return "POST_DELETE";
};

const deleteCommentService = async (userId, commentId, postId) => {
  await deleteCommentDao(userId, commentId, postId);
  return "DELETE_CONTENT";
};

const getAllPostService = async (userId, postId) => {
  return await getAllPostDao(userId, postId);
};

const createPostService = async (userId, content, img_url) => {
  const checkSubscript = await isSubscriptDao(userId);
  console.log("userId after isSubscriptDao call:", userId);
  if (checkSubscript === "false") throwError(400, "NOT_SUBSCRIBER");
  return await createPostDao(userId, content, img_url);
};

const createCommentService = async (userId, content, postId) => {
  console.log(userId, content, postId);
  const checkSubscript = await isSubscriptDao(userId);
  if (checkSubscript === "false") throwError(400, "NOT_SUBSCRIBER");
  await createCommentDao(userId, content, postId);
  return "COMMMENT_CREATE";
};

module.exports = {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
};
