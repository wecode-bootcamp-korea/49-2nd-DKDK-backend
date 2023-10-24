const { post } = require("../routes/communityRouters");
const { AppDataSource } = require("./dataSource");

//글 쓰기
const createPostDao = async (userId, content, img_url) => {
  const postResult = await AppDataSource.query(
    `
        INSERT INTO posts (user_id, content, img_url)
        VALUES (?, ?, ?)
        `,
    [userId, content, img_url]
  );
  return postResult;
};
// 글 지우기
const deletePostDao = async (userId, postId) => {
  return await AppDataSource.query(
    `
        UPDATE posts SET status = 2 WHERE user_id = ? AND id = ? 
        `,
    [userId, postId]
  );
};
// 댓글달기
const createCommentDao = async (userId, content, postId) => {
  return await AppDataSource.query(
    `
        INSERT INTO comments (user_id, content, post_id)
        VALUES (?,?,?)

        `,
    [userId, content, postId]
  );
};
//댓글 삭제
const deleteCommentDao = async (postId) => {
  console.log(postId);
  return await AppDataSource.query(
    `
    UPDATE comments SET status = 2 WHERE AND post_id= ?
    `,
    [postId]
  );
};
//게시물디테일불러오기
const getAllPostDao = async (userId, postId) => {
  const commentCountQuery = `
    SELECT COUNT(*) AS comment_count FROM comments WHERE comments.post_id = ?;
  `;
  const postDetailsQuery = `
    SELECT
      users.id AS user_id,
      users.nickname,
      users.img_url,
      comments.id AS comment_id,
      comments.content AS comment_content,
      likes.id AS like_id,
      likes.post_id AS liked_post_id,
      likes.user_id AS liked_user_id,
      posts.id AS post_id,
      posts.content AS post_content,
      posts.create_at AS post_create_at,
      posts.img_url AS post_img
    FROM users
    LEFT JOIN comments ON users.id = comments.user_id
    LEFT JOIN likes ON users.id = likes.user_id
    LEFT JOIN posts ON users.id = posts.user_id
    WHERE users.id = ? AND posts.id = ?;
  `;

  const commentCountResult = await AppDataSource.query(commentCountQuery, [
    postId,
  ]);
  const postDetailsResult = await AppDataSource.query(postDetailsQuery, [
    userId,
    postId,
  ]);
  return {
    comment_count: commentCountResult[0],
    post_details: postDetailsResult[0],
  };
};
const getPostlistDao = async (userId) => {
  const commentCountQuery = `
    SELECT COUNT(*) FROM comments JOIN posts ON posts.id = comments.post_id 
  `;
  const likeCountQuery = `
  SELECT COUNT(*) FROM likes JOIN posts ON posts.id = likes.post_id
  `;
  const isLiked = `
  SELECT CASE WHEN (SELECT likes.id FROM likes JOIN posts ON posts.id = likes.post_id
    WHERE likes.user_id = ?) IS NULL THEN 'false' ELSE 'true' END AS isLiked
    `;
  const isMypost = `
  SELECT CASE WHEN EXISTS (SELECT posts.id FROM posts WHERE user_id = ?) THEN 'true' ELSE 'false' END AS isMyPost
`;
  const postlistQuery = `
    SELECT
      users.id AS user_id,
      users.nickname,
      users.img_url,
      posts.id AS post_id,
      posts.title AS title,
      posts.img_url AS post_img,
      comments.content AS comment_content,
      (${commentCountQuery}) AS commentCount,
      (${likeCountQuery}) AS likeCount,
      (${isLiked}) AS isLiked,
      (${isMypost}) AS isMyPost,
      posts.content AS post_content,
      DATE_FORMAT(posts.create_at, '%Y-%m-%d') AS post_create_at
    FROM users
    LEFT JOIN comments ON users.id = comments.user_id
    LEFT JOIN likes ON users.id = likes.user_id
    LEFT JOIN posts ON users.id = posts.user_id
    WHERE users.id = ?;
  `;

  const postDetailsResult = await AppDataSource.query(postlistQuery, [
    userId,
    userId,
    userId,
  ]);
  return postDetailsResult[0];
};
const getCommentDao = async (postId) => {
  const getComment = await AppDataSource.query(
    `
  SELECT
  comments.content AS content,
  comments.post_id AS post_id,
  comments.user_id AS user_id
FROM comments
LEFT JOIN posts ON posts.id = comments.post_id
WHERE comments.post_id = ?
  `,
    [postId]
  );
  return getComment;
};

// 구독자 여부 확인
const isSubscriptDao = async (userId) => {
  const result = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT u.nickname FROM sub_orders so
            JOIN users u ON so.user_id  = u.id
            WHERE u.id = ?) IS NULL
            THEN 'false'
            ELSE 'true'
        END AS isSubscriptDao;
      `,
    [userId]
  );
  return result.isSubscriptDao;
};

module.exports = {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  deleteCommentDao,
  isSubscriptDao,
  getPostlistDao,
  getCommentDao,
};
