-- migrate:up
CREATE TABLE `food_types` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `create_at` timestamp DEFAULT (now())
);

-- migrate:down
DROP TABLE food_types;
