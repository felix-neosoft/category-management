const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    pid:{
        type:String,
        unique:true
    },
    name:{
        type:String,
    },
    mainCategory:{
        type:String
    },
    subCategory:{
        type:String
    },
    stock:{
        type:Number
    },
    price:{
        type:Number
    },
    desc:{
        type:String
    },
    images:[]
})

module.exports = mongoose.model('products',productSchema)