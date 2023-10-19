const { dataSource, AppDataSource } = require("./dataSource");

const userRecordReader = async (id) => {
  const userRecentRecords = await AppDataSource.query(
  `
    SELECT 
      JSON_ARRAYAGG(JSON_OBJECT('value', j.muscleMass, 'date', j.date)) AS numberMuscleRecords,
      JSON_ARRAYAGG(JSON_OBJECT('value', j.weight, 'date', j.date)) AS numberWeightRecords,
      JSON_ARRAYAGG(JSON_OBJECT('value', j.bodyFat, 'date', j.date)) AS numberFatRecords,
      JSON_ARRAYAGG(JSON_OBJECT('value', j.maxHeartrate, 'date', j.date)) AS numberHeartbeatRecords
    FROM (
      SELECT 
        r.user_id AS userId, 
        r.water_content AS waterContent, 
        r.workout_time AS workoutTime,
        r.current_weight AS weight, 
        u.height, 
        r.muscle_mass AS muscleMass, 
        r.body_fat AS bodyFat, 
        r.max_heartrate AS maxHeartrate, 
        DATE_FORMAT(r.created_at, '%Y-%m-%d') AS date 
      FROM workout_records r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.user_id = ${id}
    ORDER BY r.created_at ASC 
    LIMIT 12
  ) AS j; 
  `
  );
  return userRecentRecords;
};

const recordCreator = async (addRecord) => {
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
};

const recordUpdater = async (addRecord) => {
  const updater = `
    UPDATE workout_records
    SET 
      water_content = CASE WHEN ? IS NOT NULL THEN ? ELSE water_content END,
      workout_time = CASE WHEN ? IS NOT NULL THEN ? ELSE workout_time END,
      current_weight = CASE WHEN ? IS NOT NULL THEN ? ELSE current_weight END,
      muscle_mass = CASE WHEN ? IS NOT NULL THEN ? ELSE muscle_mass END,
      body_fat = CASE WHEN ? IS NOT NULL THEN ? ELSE body_fat END,
      max_heartrate = CASE WHEN ? IS NOT NULL THEN ? ELSE max_heartrate END
    WHERE
      user_id = ? AND DATE(created_at) = CURDATE();
    `;

  const values = [
    addRecord.waterContent,
    addRecord.waterContent,
    addRecord.workoutTime,
    addRecord.workoutTime,
    addRecord.currentWeight,
    addRecord.currentWeight,
    addRecord.muscleMass,
    addRecord.muscleMass,
    addRecord.bodyFat,
    addRecord.bodyFat,
    addRecord.maxHeartrate,
    addRecord.maxHeartrate,
    addRecord.userId,
  ];
  const recordUpdater = await AppDataSource.query(updater, values);
  return recordUpdater;
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

const recordIdChecker = async (addRecord) => {
  const id = addRecord.userId;
  const idChecker = await AppDataSource.query(
    `SELECT user_id AS userId FROM workout_records WHERE user_id = ${id}`
  );
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
  const createdAt = addRecord.createdAt;
  const checker = await AppDataSource.query(
    `SELECT created_at AS createdAt FROM workout_records WHERE user_id = ${id} ORDER BY created_at DESC LIMIT 1`
  );
  return checker;
};

module.exports = {
  recordCreator,
  recordUpdater,
  recordTimeChecker,
  recordIdChecker,
  recordIdParamsChecker,
  userRecordReader,
  avgWorkoutTimeTotal,
  avgWorkoutTimeUser,
 

};
