const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasedMerch = new Schema ({
    to_name: {
        type: String,
    },
    from_name: {
        type: String,
    },
    total: {
        type: Number,
    },
    date: {
        type: Date,
    },
    department: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    name: {
        type: String,
    },
    prices: {
        type: Number,
    },
    image: {
        type: String,
    },
    sizes: {
        type: String,
    },
});

const MerchPurchased = mongoose.model('MerchPurchased', purchasedMerch);
module.exports = MerchPurchased;