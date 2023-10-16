-- migrate:up
ALTER TABLE products
MODIFY price decimal(10,2) NOT NULL;

ALTER TABLE subscriptions
MODIFY price decimal(10,2) NOT NULL;

ALTER TABLE users
MODIFY height decimal(10,2) NOT NULL;

ALTER TABLE users
MODIFY weight decimal(10,2) NOT NULL;

ALTER TABLE workout_records
MODIFY COLUMN workout_time DECIMAL(10, 2) DEFAULT NULL;

ALTER TABLE workout_records
MODIFY COLUMN current_weight DECIMAL(10, 2) DEFAULT NULL;

ALTER TABLE workout_records
MODIFY COLUMN muscle_mass DECIMAL(10, 2) DEFAULT NULL;

ALTER TABLE workout_records
MODIFY COLUMN body_fat DECIMAL(10, 2) DEFAULT NULL;


-- migrate:down

