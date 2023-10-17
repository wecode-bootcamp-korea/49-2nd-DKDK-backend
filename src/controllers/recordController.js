const express = require('express');
const recordService = require('../services/recordService');
const { throwError } = require('../utils/throwError');
const { DataSource } = require('typeorm');
const { testService, createRecordService } = recordService;


const testController = async(req, res) => {
    const { id } = req.params;
    const controllerTester = await recordService.testService(id);
    console.log("Here is your controller")
    return res.status(200).json(controllerTester);
}

const readRecord = async(req, res) => {
    const { id } = req.params;
    const readRecordService = await recordService.readRecordService(Number(id));
    return res.status(200).json(readRecordService);
}


const createRecord = async(req, res) => {
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
}

module.exports = {
    testController,
    readRecord,
    createRecord,
}


