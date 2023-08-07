const {Schema, model} = require ("mongoose");

const ProductsSchema = Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    category: {
        type: String,
        
        
    },
    description: {
        type: String,
        required: true
    },
    propiedades:{
        type: String,
        required: true
    },
 
    price: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        default: "default.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = model("Products", ProductsSchema, "Product");
                      