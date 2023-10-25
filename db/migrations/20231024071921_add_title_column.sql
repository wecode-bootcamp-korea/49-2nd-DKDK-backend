-- migrate:up
ALTER TABLE posts
ADD title VARCHAR(100) NULL;

-- migrate:down

