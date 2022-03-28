const express = require('express')
const { addProducts, getProducts, updateProducts, deleteProduct } = require('../controller/Products')
const uploadImages = require('../modules/ImagesUpload')
const Router = express.Router()

Router.get('/products',getProducts)
Router.post('/products/add',uploadImages.array('images',6),addProducts)
Router.post('/products/update',uploadImages.array('images',6),updateProducts)
Router.delete('/products',deleteProduct)


module.exports = Router