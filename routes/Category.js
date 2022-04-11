const express = require('express')
const { addMainCategory, getCategory, addSubCategory, updateMainCategory, deleteMainCategory, updateSubCategory, deleteSubCategory } = require('../controller/Category')
const { checkProduct } = require('../controller/Products')
const Router = express.Router()


Router.get('/category',getCategory)
Router.post('/category',addMainCategory)
Router.put('/category',addSubCategory)
Router.post('/category/main',updateMainCategory)
Router.delete('/category/main',checkProduct,deleteMainCategory)
Router.post('/category/sub',updateSubCategory)
Router.delete('/category/sub',checkProduct,deleteSubCategory)


module.exports = Router
