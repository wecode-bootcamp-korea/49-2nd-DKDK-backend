-- migrate:up
CREATE TABLE `workout_records` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `water_content` int DEFAULT NULL,
  `workout_time` decimal DEFAULT NULL,
  `current_weight` decimal DEFAULT NULL,
  `muscle_mass` decimal DEFAULT NULL,
  `body_fat` decimal DEFAULT NULL,
  `max_heartrate` int DEFAULT NULL,
  `created_at` timestamp DEFAULT (now())
);
ALTER TABLE `workout_records` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;


-- migrate:down
DROP TABLE workout_records;
