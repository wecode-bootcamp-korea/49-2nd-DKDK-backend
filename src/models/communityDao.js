const { dataSource } = require("./dataSource");

//글 쓰기
const createPostDao = async (userId, content, img_url) => {
  return await dataSource.query(
    `
        INSERT INTO posts (user_id, content, img_url)
        VALUES (?, ?, ?)
        `,
    [userId, content, img_url]
  );
};
// 글 지우기
const deletePostDao = async (userId, postId) => {
  return await dataSource.query(
    `
        DELETE FROM posts WHERE user_id =? AND id = ? 
        `,
    [userId, postId]
  );
};
// 댓글달기
const createCommentDao = async (userId, content) => {
  return await dataSource.query(
    `
        INSERT INTO comments (userId, content)
        VALUES (?,?)
        `,
    [userId, content]
  );
};
//댓글 삭제
const deleteCommentDao = async (userId, content) => {
  return await dataSource.query(
    `
    DELETE FROM comments WHERE user_id = ? AND content = ?
    `,
    [userId, content]
  );
};

const getAllPostDao = async (userId, postId) => {
  return await dataSource.query(
    `
    SELECT 
    users.id AS user_id,
    users.username,
    comments.id AS comment_id,
    comments.content AS comment_content,
    likes.id AS like_id,
    likes.post_id AS liked_post_id,
    likes.user_id AS liked_user_id,
    posts.id AS post_id,
    posts.content AS post_content
FROM 
    users
LEFT JOIN
    comments ON users.id = comments.user_id
LEFT JOIN
    likes ON users.id = likes.user_id
LEFT JOIN
    posts ON users.id = posts.user_id
WHERE
    users.id = ? AND posts.id = ?;


    `,
    [userId, postId]
  );
};

// 구독자 여부 확인
const isSubscriptDao = async (userId) => {
  await dataSource.query(
    `SELECT CASE
          WHEN (SELECT u.nickname FROM sub_orders so
              JOIN users u ON so.user_id  = u.id
              WHERE u.id = ?) IS NULL
              THEN 'false'
              ELSE 'true'
          END AS isTrainer;
      `,
    [userId]
  );
  return result;
};

module.exports = {
  createPostDao,
  deletePostDao,
  createCommentDao,
  getAllPostDao,
  deleteCommentDao,
  isSubscriptDao,
};
