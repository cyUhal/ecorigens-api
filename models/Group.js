const {Schema, model} = require ("mongoose");


const GroupSchema = Schema({

    users: {
        type: [String]
    },
    articles: {
        type: [String]
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    nameBlog: {
        type: String,
        required: true 
    }

})

module.exports = model("Groups", GroupSchema, "Group");