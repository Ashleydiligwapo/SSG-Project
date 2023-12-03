const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MerchSchema = new Schema({
    price: {
        type: Number,
        // required: true,
    },
    name: {
        type: String,
       //  required: true,
    },
    type: {
        type: String,
       //  required: true,
    },
    stock: {
        type: Number,
       //  required: true,
    },
    image: {
        type: String,
      //  required: true,
    },
    material: {
        type: String,
    },
    variation: {
        type: String,
    },
    plusSize: {
        type: String,
    },
});

const Merch = mongoose.model('Merch', MerchSchema);
module.exports = Merch;