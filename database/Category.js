const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        unique:true
    },
    subCategory:[]
})

module.exports = mongoose.model('category',categorySchema)