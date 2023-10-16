-- migrate:up
CREATE TABLE `trainers` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `specialized` int
);
ALTER TABLE `trainers` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE trainers;

