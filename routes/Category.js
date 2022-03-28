const express = require('express')
const { addMainCategory, getCategory, addSubCategory, updateMainCategory, deleteMainCategory, updateSubCategory, deleteSubCategory } = require('../controller/Category')
const Router = express.Router()


Router.get('/category',getCategory)
Router.post('/category',addMainCategory)
Router.put('/category',addSubCategory)
Router.post('/category/main',updateMainCategory)
Router.delete('/category/main',deleteMainCategory)
Router.post('/category/sub',updateSubCategory)
Router.delete('/category/sub',deleteSubCategory)


module.exports = Router
