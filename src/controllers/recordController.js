const recordService = require('../services/recordService');

const readRecord = async(req, res) => {
    const requestReadRecord = req.body;
    const { id, createdDate } = requestReadRecord;
}


const createRecord = async(req, res) => {
    const requestCreateRecord = req.body;
    const { id, createdDate } = requestCreateRecord;
}

module.exports = {
    readRecord,
    createRecord,
}
