const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanyardsSchema = new Schema ({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    department: {
        type: String,
    },
    // availability :{
    //     //if required.
    //     type: String,
    // },
});

const Lanyards = mongoose.model('Lanyards', LanyardsSchema);
module.exports = Lanyards;