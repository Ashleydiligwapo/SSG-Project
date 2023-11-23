const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
    },
    HreF: {
        type: String,
        //required: true,
    },
    PostText: {
        type: String,
        //required: true,
    },
    images: {
        type: String,
    },

});
const Lists = mongoose.model('Lists', ListsSchema);
module.exports = Lists;
