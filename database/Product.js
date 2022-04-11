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
    mainImage:{
        type:String
    },
    subImages:[],
    status:{
        type:Boolean
    }
})

module.exports = mongoose.model('products',productSchema)