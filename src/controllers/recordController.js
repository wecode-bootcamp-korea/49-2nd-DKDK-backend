const express = require("express");
const recordService = require("../services/recordService");
const { throwError } = require("../utils/throwError");
const { DataSource } = require("typeorm");
const { readRecordService, createRecordService } = recordService;

const readRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const readRecordService = await recordService.readRecordService(Number(id));
    return res.status(200).json(readRecordService);
  } catch (error) {
    console.log(error);
  }
};

const createRecord = async (req, res) => {
  try {
    const addRecord = req.body;
    const {
      userId,
      waterContent,
      workoutTime,
      currentWeight,
      muscleMass,
      bodyFat,
      maxHeartrate,
    } = addRecord;
    const addRecordService = await recordService.createRecordService(addRecord);
    return res.status(200).json(addRecordService);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readRecord,
  createRecord,
};
