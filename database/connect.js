const Mongoose = require('mongoose')

async function DBconnect() {
    const db = 'mongodb://localhost:27017/eshop_150322'
    try{
        await Mongoose.connect(db,{useNewUrlParser:true})
        console.log('Database Connected')
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = DBconnect