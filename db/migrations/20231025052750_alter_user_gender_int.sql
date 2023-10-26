-- migrate:up
ALTER TABLE users
MODIFY gender INT DEFAULT NULL;

-- migrate:down

