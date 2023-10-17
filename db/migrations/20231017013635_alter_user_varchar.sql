-- migrate:up
ALTER TABLE users
MODIFY kakao_id VARCHAR(50) NULL;

ALTER TABLE users
MODIFY naver_id VARCHAR(50) NULL;

-- migrate:down

