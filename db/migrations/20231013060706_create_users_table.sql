-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) UNIQUE,
  `kakao_id` int,
  `naver_id` int,
  `birthday` varchar(10),
  `gender` varchar(6),
  `phone_number` int(11),
  `user_type` int,
  `height` decimal,
  `weight` decimal,
  `interested_workout` int,
  `workout_load` int,
  `img_url` varchar(255),
  `created_at` timestamp
);

-- migrate:down
DROP TABLE users;
