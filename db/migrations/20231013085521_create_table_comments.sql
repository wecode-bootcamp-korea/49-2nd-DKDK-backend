-- migrate:up
CREATE TABLE `comments` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `status` int DEFAULT 1,
  `create_at` timestamp DEFAULT (now()),
  `delete_at` timestamp
);
ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;
ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE comments;
