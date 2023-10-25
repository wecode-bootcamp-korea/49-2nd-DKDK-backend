const express = require("express");
const recordService = require("../services/recordService");

const readRecord = async (req, res) => {
  const id = req.userId;
  const readRecord = await recordService.readRecord(Number(id));
  if (!readRecord) return res.status(400).json({ message: "NO_USER" });
  return res.status(200).json(readRecord);
};

const createRecord = async (req, res) => {
  const id = req.userId;
  const recordData = req.body;

  if (recordData.waterContent > 100)
    return res.status(400).json({ message: "WATER_CONTENT EXCEEDS 100" });
  if (recordData.muscleMass > 100)
    return res.status(400).json({ message: "MUSCLE_MASS EXCEEDS 100" });
  if (recordData.bodyFat > 100)
    return res.status(400).json({ message: "BODY_FAT EXCEEDS 100" });
  if (recordData.workoutTime > 24)
    return res.status(400).json({ message: "INPUT_TIME EXCEEDS 24" });

  const {
    waterContent,
    workoutTime,
    currentWeight,
    muscleMass,
    bodyFat,
    maxHeartrate,
  } = recordData;
  const createRecord = await recordService.createRecord(id, recordData);
  if (!createRecord) return res.status(400).json({ message: "NOT_UPDATED" });
  return res.status(200).json({ message: "UPDATED" });
};

module.exports = {
  readRecord,
  createRecord,
};
