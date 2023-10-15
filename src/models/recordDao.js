const { dataSource, AppDataSource } = require("./dataSource");

const maxHeartbeatReader = async (id) => {
  const heartbeatReader = await AppDataSource.query(
    `SELECT MAX(max_heartrate) AS maxHeartrate, created_date AS createdDate FROM 
    workout_records 
    GROUP BY 
      created_date
    ORDER BY 
      created_date DESC
    LIMIT 12;`
  );
  return heartbeatReader;
};

const musclemassReader = async (id) => {
  const rawMuscleMassReader = await AppDataSource.query(
    `SELECT MAX(muscle_mass) AS muscleMass, created_date AS createdDate FROM 
    workout_records 
    GROUP BY 
      created_date
    ORDER BY 
      created_date DESC
      LIMIT 12;`
  );
  return rawMuscleMassReader;
};

const bodyfatReader = async (id) => {
  const rawBodyFatReader = await AppDataSource.query(
    `SELECT MAX(body_fat) AS bodyFat, created_date AS createdDate FROM 
    workout_records 
    GROUP BY 
      created_date
    ORDER BY 
      created_date DESC
    LIMIT 12;`
  );
  return rawBodyFatReader;
};

const weightReader = async (id) => {
  const rawWeightReader = await AppDataSource.query(
    `SELECT MAX(current_weight) AS weight, created_date AS createdDate FROM 
    workout_records 
    GROUP BY 
      created_date
    ORDER BY 
      created_date DESC
      LIMIT 12;`
  );
  return rawWeightReader;
};

const bmiReader = async(id) => {
  const rawHeightReader = await AppDataSource.query(
    `SELECT current_weight AS weight, height, created_date AS createdDate FROM workout_records
    LEFT JOIN users ON workout_records.user_id = users.id WHERE user_id = ${id}`)
  return rawHeightReader;
}


const timeReader = async (id) => {
  const rawTimeReader = await AppDataSource.query(
    `SELECT MAX(workout_time) AS workoutTime, created_date AS createdDate FROM 
    workout_records 
    GROUP BY 
      created_date
    ORDER BY 
      created_date DESC
      LIMIT 12;`
  );
  return rawTimeReader;
};
const recordCreator = async (addRecord) => {
  try {
    const creator = `
      INSERT INTO workout_records 
        (
            user_id, 
            water_content, 
            workout_time, 
            current_weight, 
            muscle_mass, 
            body_fat, 
            max_heartrate,
            created_date
        ) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?);
      `;
    const values = [
      addRecord.userId,
      addRecord.waterContent,
      addRecord.workoutTime,
      addRecord.currentWeight,
      addRecord.muscleMass,
      addRecord.bodyFat,
      addRecord.maxHeartrate,
      addRecord.createdDate,
    ];
    const recordCreator = await AppDataSource.query(creator, values);
    return recordCreator;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

const testDao = async (id) => {
  console.log(id);
  const tester = await AppDataSource.query(
    `SELECT * FROM workout_records WHERE user_id = ${id}`
  );
  console.log(tester);
  return tester;
};

module.exports = {
  testDao,
  recordCreator,
  timeReader,
  weightReader,
  bmiReader,
  maxHeartbeatReader,
  musclemassReader,
  bodyfatReader,
};

