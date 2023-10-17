const { dataSource, AppDataSource } = require("./dataSource");


const maxHeartbeatReader = async (id) => {
  const heartbeatReader = await AppDataSource.query(
    `SELECT max_heartrate AS maxHeartrate, created_date AS createdDate
      FROM workout_records
      WHERE user_id = ${id}
      ORDER BY createdDate DESC
    LIMIT 12;
`
  );
  return heartbeatReader;
};

const musclemassReader = async (id) => {
  const rawMuscleMassReader = await AppDataSource.query(
    `SELECT muscle_mass AS muscleMass, created_date AS createdDate
    FROM workout_records
    WHERE user_id = ${id}
    ORDER BY createdDate DESC
    LIMIT 12;
    `
  );
  return rawMuscleMassReader;
};

const bodyfatReader = async (id) => {
  const rawBodyFatReader = await AppDataSource.query(
    `SELECT body_fat AS bodyFat, created_date AS createdDate
    FROM workout_records
    WHERE user_id = ${id}
    ORDER BY createdDate DESC
    LIMIT 12;
    `
  );
  return rawBodyFatReader;
};

const weightReader = async (id) => {
  const rawWeightReader = await AppDataSource.query(
    `SELECT current_weight AS weight, created_date AS createdDate FROM 
    workout_records WHERE user_id = ${id}
    ORDER BY 
      created_date DESC
      LIMIT 12;`
  );
  return rawWeightReader;
};

const bmiReader = async (id) => {
  const rawHeightReader = await AppDataSource.query(
    `SELECT current_weight AS weight, height, created_date AS createdDate FROM workout_records
    LEFT JOIN users ON workout_records.user_id = users.id WHERE user_id = ${id}`
  );
  return rawHeightReader;
};

const timeReader = async (id) => {
  const rawTimeReader = await AppDataSource.query(
    `SELECT MAX(workout_time) AS workoutTime, created_date AS createdDate
    FROM workout_records
    WHERE user_id = ${id}
    GROUP BY created_date
    ORDER BY createdDate DESC
    LIMIT 12;
    `
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
        max_heartrate
    ) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?);    
      `;
    const values = [
      addRecord.userId,
      addRecord.waterContent,
      addRecord.workoutTime,
      addRecord.currentWeight,
      addRecord.muscleMass,
      addRecord.bodyFat,
      addRecord.maxHeartrate,
    ];
    const recordCreator = await AppDataSource.query(creator, values);
    return recordCreator;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

const recordUpdater = async (addRecord) => {
  try {
    const updater = `
    UPDATE workout_records
    SET
      water_content = ?,
      workout_time = ?,
      current_weight = ?,
      muscle_mass = ?,
      body_fat = ?,
      max_heartrate = ?
    WHERE
      user_id = ?;
  `;
  
  const values = [
    addRecord.waterContent,
    addRecord.workoutTime,
    addRecord.currentWeight,
    addRecord.muscleMass,
    addRecord.bodyFat,
    addRecord.maxHeartrate,
    addRecord.userId,
  ];
  // 쿼리문 작성과 관련 부분에 대해서 고민이 있었음
  const recordUpdater = await AppDataSource.query(updater, values);
  return recordUpdater;
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
};

const avgWorkoutTimeUser = async (id) => {
  const avgWorkoutTimeUserLoad = await AppDataSource.query(
    `SELECT AVG(workout_time) AS workoutTime FROM workout_records WHERE user_id = ${id}`
  );
  return avgWorkoutTimeUserLoad;
};

const avgWorkoutTimeTotal = async (id) => {
  const avgWorkoutTimeTotalLoad = await AppDataSource.query(
    `SELECT AVG(workout_time) AS workoutTime FROM workout_records`
  );
  return avgWorkoutTimeTotalLoad;
};

const testDao = async (id) => {
  console.log(id);
  const tester = await AppDataSource.query(
    `SELECT * FROM workout_records WHERE user_id = ${id}`
  );
  console.log(tester);
  return tester;
};

const recordIdChecker = async (addRecord) => {
  const id = addRecord.userId;
  const idChecker = await AppDataSource.query(
    `SELECT user_id AS userId FROM workout_records WHERE user_id = ${id}`
  );
  console.log(idChecker)
  return idChecker;
};


const recordIdParamsChecker = async (id) => {
  const idParamsChecker = await AppDataSource.query(
    `SELECT user_id AS userId FROM workout_records WHERE user_id = ${id}`
  );
  return idParamsChecker;
};

const recordTimeChecker = async (addRecord) => {
  const id = addRecord.userId;
  const createdDate = addRecord.createdDate;
  const checker = await AppDataSource.query(
    `SELECT created_date AS createdDate FROM workout_records WHERE user_id = ${id} ORDER BY created_date DESC LIMIT 1`
  );
  return checker;
};

module.exports = {
  recordTimeChecker,
  recordIdChecker,
  recordCreator,
  recordUpdater,
  weightReader,
  avgWorkoutTimeTotal,
  avgWorkoutTimeUser,
  timeReader,
  bmiReader,
  maxHeartbeatReader,
  recordIdParamsChecker,
  musclemassReader,
  bodyfatReader,
  testDao,
};
