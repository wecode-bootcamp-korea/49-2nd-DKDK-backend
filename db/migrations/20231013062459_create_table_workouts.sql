-- migrate:up
CREATE TABLE `workouts` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `repetition` varchar(10) NOT NULL,
  `set` int NOT NULL,
  `img_url` varchar(255)
);
ALTER TABLE `workouts` ADD FOREIGN KEY (`category_id`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE;

-- migrate:down
DROP TABLE workouts;
