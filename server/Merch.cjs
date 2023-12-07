const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MerchSchema = new Schema({
    price: {
        type: Number,
        // required: true,
        // Price of the items
    },
    name: {
        type: String,
       //  required: true,
       // Item name
    },
    type: {
        type: String,
       //  required: true,
       // MALE OR FEMALE
    },
    stock: {
        type: Number,
        required: true,
       // availability of the items
    },
    image: {
        type: String,
      //  required: true,
      // image 
    },
    material: [{
        type: String,
        // Cotton, Silk, Jersey , LineIn, Polyester.
    }],
    variation: [{
        type: String,
        // HENLEY, Crewneck, V-Neck, Polo, Jeyser/Athletic, Sleeveless.
    }],
    plusSize: [{
        type: String,
        //  shirt sizes
        // XS, S , M , L , XL , XXL , 3XL , 4XL , 5XL
    }],
    color: [{ 
        type: String,       
        // Item Color
}],
    Tprint: [{
             type: String,
        // Item print
        // Screen Print, Dye Sublimation, Air Brushing, Full Sublimation, Heat press Printing, Text Tile Printing.
    }],
});

const Merch = mongoose.model('Merch', MerchSchema);
module.exports = Merch;