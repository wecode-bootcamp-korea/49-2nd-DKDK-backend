-- migrate:up
CREATE TABLE `subscriptions` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `price` decimal NOT NULL,
  `term` int DEFAULT 1
);

-- migrate:down
DROP TABLE subscriptions;
