-- migrate:up
ALTER TABLE users
MODIFY height decimal(10,2) DEFAULT NULL;

ALTER TABLE users
MODIFY weight decimal(10,2) DEFAULT NULL;

-- migrate:down

