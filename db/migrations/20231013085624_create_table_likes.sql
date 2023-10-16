-- migrate:up
CREATE TABLE `likes` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_at` timestamp DEFAULT (now())
);
ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;
ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE likes;
