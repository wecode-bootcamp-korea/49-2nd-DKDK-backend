-- migrate:up
ALTER TABLE pt_orders
MODIFY COLUMN created_at timestamp DEFAULT (now());

ALTER TABLE sub_orders
MODIFY COLUMN created_at timestamp DEFAULT (now());

ALTER TABLE users
MODIFY COLUMN created_at timestamp DEFAULT (now());

-- migrate:down
