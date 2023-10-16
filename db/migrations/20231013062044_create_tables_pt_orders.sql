-- migrate:up
CREATE TABLE `pt_orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `buyer_user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp
);
ALTER TABLE `pt_orders` ADD FOREIGN KEY (`buyer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE pt_orders;

