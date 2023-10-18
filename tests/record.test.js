// tests/user.test.js

// npm i --save-dev supertest
const request = require("supertest");

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require("../app");
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { AppDataSource } = require("../src/models/dataSource");

describe("read Records", () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize().then(() => {
      console.log("test db initialized");   
    });
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    // await AppDataSource.query(`TRUNCATE workout_records`);
    // 모든 테스트가 끝나게 되면(afterAll) DB 커넥션을 끊어줍니다.
    await AppDataSource.destroy();
  });

  test("FAILED: Unable to find the user", async () => {
    await request(app)
    .get("/records/readRecord/6")
    .expect(400)
    .expect('"NO_USER"')
  });

  test("SUCCESS: Unable to find the user", async () => {
    await request(app)
    .get("/records/readRecord/3")
    .expect(200)
    .expect({
      "numberMuscleRecords": [
          {
              "muscleMass": 23,
              "createdAt": "2023-10-17"
          },
          {
              "muscleMass": 41,
              "createdAt": "2023-10-07"
          },
          {
              "muscleMass": 41,
              "createdAt": "2023-10-06"
          },
          {
              "muscleMass": 40,
              "createdAt": "2023-10-05"
          },
          {
              "muscleMass": 39,
              "createdAt": "2023-10-04"
          },
          {
              "muscleMass": 38,
              "createdAt": "2023-10-03"
          },
          {
              "muscleMass": 35,
              "createdAt": "2023-10-02"
          },
          {
              "muscleMass": 34,
              "createdAt": "2023-10-01"
          },
          {
              "muscleMass": 33,
              "createdAt": "2023-09-30"
          }
      ],
      "numberBmiRecords": [
          {
              "bmi": 37.36,
              "createdAt": "2023-09-30"
          },
          {
              "bmi": 36.37,
              "createdAt": "2023-10-01"
          },
          {
              "bmi": 35.3,
              "createdAt": "2023-10-02"
          },
          {
              "bmi": 34.42,
              "createdAt": "2023-10-03"
          },
          {
              "bmi": 31.86,
              "createdAt": "2023-10-04"
          },
          {
              "bmi": 29.39,
              "createdAt": "2023-10-05"
          },
          {
              "bmi": 27.8,
              "createdAt": "2023-10-07"
          },
          {
              "bmi": 27.8,
              "createdAt": "2023-10-06"
          },
          {
              "bmi": 33.56,
              "createdAt": "2023-10-17"
          }
      ],
      "numberFatRecords": [
          {
              "bodyFat": 23,
              "createdAt": "2023-10-17"
          },
          {
              "bodyFat": 57.75,
              "createdAt": "2023-10-07"
          },
          {
              "bodyFat": 57.75,
              "createdAt": "2023-10-06"
          },
          {
              "bodyFat": 54.79,
              "createdAt": "2023-10-05"
          },
          {
              "bodyFat": 51.32,
              "createdAt": "2023-10-04"
          },
          {
              "bodyFat": 48.1,
              "createdAt": "2023-10-03"
          },
          {
              "bodyFat": 43.75,
              "createdAt": "2023-10-02"
          },
          {
              "bodyFat": 41.87,
              "createdAt": "2023-10-01"
          },
          {
              "bodyFat": 40.1,
              "createdAt": "2023-09-30"
          }
      ],
      "numberHeartbeatRecords": [
          {
              "maxHeartbeat": 145,
              "createdAt": "2023-10-17"
          },
          {
              "maxHeartbeat": 182,
              "createdAt": "2023-10-07"
          },
          {
              "maxHeartbeat": 182,
              "createdAt": "2023-10-06"
          },
          {
              "maxHeartbeat": 183,
              "createdAt": "2023-10-05"
          },
          {
              "maxHeartbeat": 186,
              "createdAt": "2023-10-04"
          },
          {
              "maxHeartbeat": 181,
              "createdAt": "2023-10-03"
          },
          {
              "maxHeartbeat": 149,
              "createdAt": "2023-10-02"
          },
          {
              "maxHeartbeat": 187,
              "createdAt": "2023-10-01"
          },
          {
              "maxHeartbeat": 169,
              "createdAt": "2023-09-30"
          }
      ],
      "numberWorkoutTimeRecords": [
          {
              "workoutTime": 1,
              "workoutTimeKr": "1시간 0분",
              "createdAt": "2023-10-17"
          },
          {
              "workoutTime": 1,
              "workoutTimeKr": "1시간 0분",
              "createdAt": "2023-10-07"
          },
          {
              "workoutTime": 2,
              "workoutTimeKr": "2시간 0분",
              "createdAt": "2023-10-06"
          },
          {
              "workoutTime": 1,
              "workoutTimeKr": "1시간 0분",
              "createdAt": "2023-10-05"
          },
          {
              "workoutTime": 1.5,
              "workoutTimeKr": "1시간 30분",
              "createdAt": "2023-10-04"
          },
          {
              "workoutTime": 1,
              "workoutTimeKr": "1시간 0분",
              "createdAt": "2023-10-03"
          },
          {
              "workoutTime": 0.5,
              "workoutTimeKr": "0시간 30분",
              "createdAt": "2023-10-02"
          },
          {
              "workoutTime": 1,
              "workoutTimeKr": "1시간 0분",
              "createdAt": "2023-10-01"
          },
          {
              "workoutTime": 0.5,
              "workoutTimeKr": "0시간 30분",
              "createdAt": "2023-09-30"
          }
      ],
      "numberCompareTime": {
          "avgTimeTotal": 1.055556,
          "avgTimeTotalKr": "1시간 3분",
          "avgTimeUser": 1.055556,
          "avgTimeUserKr": "1시간 3분"
      }
  })
  });
});