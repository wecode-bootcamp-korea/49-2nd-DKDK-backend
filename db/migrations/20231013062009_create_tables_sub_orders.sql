-- migrate:up
CREATE TABLE `sub_orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sub_id` int NOT NULL,
  `created_at` timestamp,
  `end_at` datetime NOT NULL
);
ALTER TABLE `sub_orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `sub_orders` ADD FOREIGN KEY (`sub_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE sub_orders;
