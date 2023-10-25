const request = require("supertest");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("GET Trainer Information", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();

    //필수 정보 생성
    //1. workout category
    await AppDataSource.query(
      `INSERT INTO workout_categories (id, category)
        VALUES
        (1, '헬스'),
        (2, '필라테스'),
        (3, '요가');
        `
    );
    //2. users
    await AppDataSource.query(
      `INSERT INTO users
        (id, nickname, birthday, gender, phone_number, user_type, height, weight, interested_workout, workout_load)
          VALUES
        (1, '트레이너', '1994-01-01', 1, 01012341234, 2, 182.00, 75.00, 1, 1);
        `
    );
    //3. trainers
    await AppDataSource.query(
      `INSERT INTO trainers
        (id, user_id, specialized)
          VALUES
        (1, 1, 1,);
        `
    );
    //4. products
    await AppDataSource.query(
      `INSERT INTO products
          (id, trainer_id, available_area, available_time, category_name, term, price, content)
            VALUES
          (1, 1, '서울 강남구', '오후1시-오후3시', '헬스', 2, 182.00, 75.00, 1, 1);
          `
    );
    await AppDataSource.query(
      `INSERT INTO products
            (id, trainer_id, available_area, available_time, category_name, term, price, content)
              VALUES
            (1, 2, '서울 강남구', '오후2시-오후4시', '헬스', 2, 182.00, 75.00, 1, 1);
            `
    );
  });
});
