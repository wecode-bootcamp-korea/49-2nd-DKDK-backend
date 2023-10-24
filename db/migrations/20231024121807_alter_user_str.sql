-- migrate:up
ALTER TABLE users
MODIFY COLUMN phone_number varchar(50) NULL;

-- migrate:down

