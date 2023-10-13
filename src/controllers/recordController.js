const express = require('express');
const recordService = require('../services/recordService');

const testController = async(req, res) => {
    console.log("Here is your controller")
    res.send("Test controller executed");
}


const readRecord = async(req, res) => {
    const requestReadRecord = req.params;
    const currentDate = new Date();
    const { id, createdDate } = requestReadRecord;
}


const createRecord = async(req, res) => {
    const requestCreateRecord = req.body;
    const currentDate = new Date();
    const { id, createdDate } = requestCreateRecord;
}

module.exports = {
    testController,
    readRecord,
    createRecord,
}
