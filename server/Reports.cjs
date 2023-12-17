const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
    information: {
        type: String,
    },
});

const Reports = mongoose.model('Reports', reportsSchema);
module.exports = Reports;