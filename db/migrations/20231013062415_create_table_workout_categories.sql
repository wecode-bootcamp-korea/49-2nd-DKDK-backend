-- migrate:up
CREATE TABLE `workout_categories` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL
);
ALTER TABLE `trainers` ADD FOREIGN KEY (`specialized`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE;
ALTER TABLE `users` ADD FOREIGN KEY (`interested_workout`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE;


-- migrate:down
DROP TABLE workout_categories;
