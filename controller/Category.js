const CategoryModel = require('../database/Category')


const getCategory = (req,res) => {
    CategoryModel.find({},(err,data)=>{
        if(err) res.json({status:404})
        else res.json({status:200, data:data})
    })

}

const addMainCategory = (req,res) => {
    let ins = new CategoryModel({category:req.body.Category, subCategory:[]})
    ins.save( err => {
        if(err) res.json({status:404})
        else res.json({status:200})
    })
}

const addSubCategory = async(req,res) => {
    const {mainCategory, subCategory} = req.body
    console.log(mainCategory)
    await CategoryModel.findOneAndUpdate({category:mainCategory},{$push: {subCategory: {category:subCategory} }})
    res.send(200)
}

const updateMainCategory = async(req,res) => {
    await CategoryModel.findOneAndUpdate({category:req.body.prev},{category:req.body.new})
    res.json({status:200})
}

const updateSubCategory = async(req,res) => {
    await CategoryModel.findOneAndUpdate({'category':req.body.category, 'subCategory.category':req.body.prev}, {$set:{'subCategory.$.category':req.body.new}})
    res.json({status:200})
}

const deleteMainCategory = async(req,res) => {
    await CategoryModel.deleteOne({category:req.query.category})
    res.json({status:200})
}

const deleteSubCategory = async(req,res) => {
    await CategoryModel.findOneAndUpdate({'category':req.query.category, 'subCategory.category':req.query.subCategory}, {$pull:{'subCategory':{'category':req.query.subCategory}}})
    res.json({status:200})
}

module.exports = {
    getCategory,
    addMainCategory,
    addSubCategory,
    updateMainCategory,
    updateSubCategory,
    deleteMainCategory,
    deleteSubCategory
}