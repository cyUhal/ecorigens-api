const mongoose = require ('mongoose')




const connection = async() => {
    try {
        const conecct = await mongoose.connect("mongodb://mongo:3Se3pdWPbtqoeGECmECx@containers-us-west-78.railway.app:6013", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log('connection DB')
    } catch (error) {
       console.log('error connections')
    }

};


module.exports = { connection };
 