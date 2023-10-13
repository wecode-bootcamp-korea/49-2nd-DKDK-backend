-- migrate:up
CREATE TABLE `products` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `available_area` varchar(50),
  `available_time` varchar(50),
  `category_name` varchar(255) NOT NULL,
  `term` int NOT NULL,
  `price` decimal NOT NULL,
  `content` text NOT NULL,
  `status` int DEFAULT 1,
  `created_at` timestamp DEFAULT (now()),
  `delete_at` timestamp
);

ALTER TABLE `pt_orders` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
ALTER TABLE `products` ADD FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE products;
