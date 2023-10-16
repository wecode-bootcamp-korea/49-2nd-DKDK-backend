-- migrate:up
CREATE TABLE `meal_plans` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `grade` int NOT NULL
);

-- migrate:down
DROP TABLE meal_plans;
