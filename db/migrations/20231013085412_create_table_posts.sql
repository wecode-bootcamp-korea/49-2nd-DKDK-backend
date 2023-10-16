-- migrate:up
CREATE TABLE `posts` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `img_url` varchar(255),
  `status` int DEFAULT 1,
  `create_at` timestamp DEFAULT (now()),
  `delete_at` timestamp
);
ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;


-- migrate:down
DROP TABLE posts;
