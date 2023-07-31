const {Schema, model} = require ('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    
    nameBlog: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

module.exports = model ('Users', userSchema, 'User')
// revisar conexion de modelos