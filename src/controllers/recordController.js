const express = require("express");
const recordService = require("../services/recordService");
const { throwError } = require("../utils/throwError");

const readRecord = async (req, res) => {
    const id  = req.userId;
    const readRecord = await recordService.readRecord(Number(id));
    if (!readRecord) return res.status(400).json({ message: "NO_USER" });
    return res.status(200).json(readRecord);
  }

const createRecord = async (req, res) => {
    const id = req.userId;
    const recordData = req.body;
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
