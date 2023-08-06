const mongoose = require ('mongoose')

const connection = async() => {
    try{
        await mongoose.connect("mongodb://mongo:3Se3pdWPbtqoeGECmECx@containers-us-west-78.railway.app:6013", {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
    }catch(error){
        console.log(error)
        throw new Error('Error connecting to database')
    }
}


module.exports = { 
    connection
}
