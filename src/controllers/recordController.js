const express = require("express");
const recordService = require("../services/recordService");
const { throwError } = require("../utils/throwError");

const readRecord = async (req, res) => {
  try {
    const { id } = req.userId;
    const readRecord = await recordService.readRecord(Number(id));
    if (!readRecord) {
      return res.status(400).json({ message: "NO_USER" });
    }
    res.status(200).json(readRecord);
  } catch (error) {
    console.log(error);
  }
};

const createRecord = async (req, res) => {
  try {
    const id = req.userId;
    const addRecord = req.body;
    const {
      waterContent,
      workoutTime,
      currentWeight,
      muscleMass,
      bodyFat,
      maxHeartrate,
    } = addRecord;
    const createRecord = await recordService.createRecord(addRecord);

    if (!createRecord) {
      return res.status(400).json({ message: "NOT_UPDATED" });
    }
    return res.status(200).json({ message: "UPDATED" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readRecord,
  createRecord,
};
