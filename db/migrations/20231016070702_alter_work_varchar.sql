-- migrate:up
ALTER TABLE workouts
MODIFY COLUMN name varchar(50) NOT NULL;

-- migrate:down

