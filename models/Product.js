const { Schema, model } = require("mongoose");




const ProductsSchema = Schema({

    
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "default.png"
    },
    price: {
        type: Number,
        required: true,
        
    },
    inCart : {
        type: Boolean,
        required: false
    }
});



module.exports = model("Products", ProductsSchema, "Product");
