const recordService = require('../services/recordService');

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
    readRecord,
    createRecord,
}
