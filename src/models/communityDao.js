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
const deleteCommentDao = async (postId, commentId) => {
  return await AppDataSource.query(
    `
    UPDATE comments SET status = 2 WHERE post_id =? AND comments.id = ?
    `,
    [postId, commentId]
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
LEFT JOIN posts ON users.id = posts.user_id
LEFT JOIN comments ON posts.id = comments.post_id
LEFT JOIN likes ON posts.id = likes.post_id
WHERE posts.id = ?;
  `;

  const commentCountResult = await AppDataSource.query(commentCountQuery, [
    postId,
  ]);
  const postDetailsResult = await AppDataSource.query(postDetailsQuery, [
    postId,
  ]);
  const [isPostedUser] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT p.content FROM posts p
            WHERE p.user_id = ? AND p.id = ? AND p.status = 1 LIMIT 1) IS NULL
            THEN 0
            ELSE 1
        END AS isPostedUser;
      `,
    [userId, postId]
  );
  return {
    comment_count: commentCountResult[0],
    post_details: postDetailsResult[0],
    isPostedUser: isPostedUser.isPostedUser,
  };
};

//게시물 전체 불러오기
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
      (${commentCountQuery}) AS commentCount,
      (${likeCountQuery}) AS likeCount,
      (${isLiked}) AS isLiked,
      (${isMypost}) AS isMyPost,
      posts.content AS post_content,
      DATE_FORMAT(posts.create_at, '%Y-%m-%d') AS post_create_at
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    LEFT JOIN likes ON posts.id = likes.post_id
    WHERE posts.status = 1;
  `;
  const postDetailsResult = await AppDataSource.query(postlistQuery, [
    userId,
    userId,
  ]);
  return postDetailsResult;
};

//댓글목록 불러오기
const getCommentDao = async (userId, postId) => {
  // SQL 쿼리 문자열을 정의합니다.
  const query = `
    SELECT
      comments.id AS comment_id,
      comments.content AS content,
      comments.post_id AS post_id,
      comments.user_id AS user_id,
      users.nickname AS nickname,
      users.img_url AS user_img_url,
      CASE WHEN EXISTS (SELECT comments.id FROM comments WHERE user_id = comments.user_id) THEN 'true' ELSE 'false' END AS isComment
    FROM comments
    LEFT JOIN users ON users.id = comments.user_id
    WHERE comments.post_id = ?
    AND comments.status = 1;
  `;

  // 데이터베이스에 연결하고 쿼리 실행
  const result = await AppDataSource.query(query, [postId]);
  const [isCommentedUser] = await AppDataSource.query(
    `SELECT CASE
        WHEN (SELECT c.content FROM comments c
          WHERE c.user_id = ? AND c.post_id = ? AND c.status =1 LIMIT 1) IS NULL
            THEN 0
            ELSE 1
        END AS isCommentedUser;
      `,
    [userId, postId]
  );
  return { result: result, isCommentedUser: isCommentedUser.isCommentedUser };
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
const likeDao = async (userId, postId) => {
  await AppDataSource.query(
    `
   INSERT INTO likes
   (user_id, post_id)
   VALUES
   (?,?)
   `,
    [userId, postId]
  );
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
