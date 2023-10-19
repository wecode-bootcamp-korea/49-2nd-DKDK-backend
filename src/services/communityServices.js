const { communityDao } = require("../models");
const { deleteCommentDao } = require("../models/communityDao");
const { createPostDao, deletePostDao, createCommentDao, isSubscriptDao } =
  communityDao;

const deletePostService = async (userId, postId) => {
  await deletePostDao(userId, postId);
  return "POST_DELETE";
};

const deleteCommentService = async (userId, content) => {
  await deleteCommentDao(userId, content);
  return "DELETE_CONTENT";
};

const getAllPostService = async (userId, postId) => {
  getAllPostDao(userId, postId);
  return "GET_POST";
};

const createPostService = async (userId, content, img_url) => {
  const checkSubscript = await isSubscriptDao(userId);
  if (checkSubscript.length == 0) throwError(400, "NOT_SUBSCRIBER");
  return await createPostDao(userId, content, img_url);
};

const createCommentService = async (userId, content) => {
  const checkSubscript = await isSubscriptDao(userId);
  if (checkSubscript.length == 0) throwError(400, "NOT_SUBSCRIBER");
  await await createCommentDao(userId, content);
  return "COMMMENT_CREATE";
};

module.exports = {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
};
