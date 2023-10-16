-- migrate:up
CREATE TABLE `foods` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `meal_plan_id` int NOT NULL,
  `type_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `kcal` int NOT NULL,
  `weight` int NOT NULL,
  `img_url` varchar(255)
);
ALTER TABLE `foods` ADD FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE CASCADE;
ALTER TABLE `foods` ADD FOREIGN KEY (`type_id`) REFERENCES `food_types` (`id`) ON DELETE CASCADE;


-- migrate:down
DROP TABLE foods;
