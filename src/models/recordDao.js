const { dataSource, AppDataSource } = require("./dataSource");

const maxHeartbeatReader = async (id) => {
  const heartbeatReader = await AppDataSource.query(
    `SELECT max_heartrate, created_date FROM workout_records WHERE user_id = ${id}`
  );
  return heartbeatReader;
};

const musclemassReader = async (id) => {
  const rawMuscleMassReader = await AppDataSource.query(
    `SELECT muscle_mass, created_date FROM workout_records WHERE user_id = ${id}`
  );
  return rawMuscleMassReader;
};

const bodyfatReader = async (id) => {
  const rawBodyFatReader = await AppDataSource.query(
    `SELECT body_fat, created_date FROM workout_records WHERE user_id = ${id}`
  );
  return rawBodyFatReader;
};

const weightReader = async (id) => {
  const rawWeightReader = await AppDataSource.query(
    `SELECT weight, created_date FROM workout_records WHERE user_id = ${id}`
  );
  return rawWeightReader;
};

// const heightReader = async(id) => {
//   const rawHeightReader = await AppDataSource.query(
//     `SELECT height FROM users WHERE user_id = ${id}`)
//   return rawHeightReader;
// }

const timeReader = async (id) => {
  const rawTimeReader = await AppDataSource.query(
    `SELECT workout_time, created_date FROM workout_records WHERE user_id = ${id}`
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
  maxHeartbeatReader,
  musclemassReader,
  bodyfatReader,
};
