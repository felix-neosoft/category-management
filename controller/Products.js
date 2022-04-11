const ProductModal = require('../database/Product')
const fs = require('fs')
const { nextTick } = require('process')


const getProducts = async(req,res) => {
    ProductModal.find({},(err,data)=> {
        if(err) res.json({status:404})
        else res.json({status:200, data:data, protocol:`${req.protocol}://${req.get('host')}/`})
    })
}


const addProducts = async(req,res) => {
    console.log(req.body)
    console.log(req.files)
    const {id, name, mainCat, subCat, stock ,price, description} = req.body
    let image = []
    for( let i = 1; i<req.files.length; i++){
        image.push(req.files[i].filename)
    }
    let ins = new ProductModal({pid:id, name:name, mainCategory:mainCat, subCategory:subCat, stock:stock, price:price, desc: description, mainImage:req.files[0].filename, subImages:image, status:false})
    ins.save( err => {
        if(err) res.json({status:404})
        else res.json({status:200})
    })
}

const updateProducts = async(req,res) => {
    console.log(req.body)
    console.log(req.files)
    const {id, name, mainCat, subCat, stock ,price, description, state} = req.body
    if(state === 'TEXT'){
        await ProductModal.findOneAndUpdate({pid:id},{$set:{mainCategory:mainCat, subCategory:subCat, stock:stock, price:price, desc:description}})
        res.json({status:200})
    }
    //Note - Issuse in Updatin the images
    else if(state === 'TEXT+MAIN') {
        let data = await ProductModal.findOneAndUpdate({pid:id},{$set:{mainCategory:mainCat, subCategory:subCat, stock:stock, price:price, desc:description, mainImage:req.files[0].filename}}).exec()
        fs.unlink(`./images/${data.mainImage}`,(err => {
            if(err) throw err
        }))
        res.json({status:200})
    }
    else if(state === 'TEXT+SUB'){
        let image = []
        for( let i = 0; i<req.files.length; i++){
            image.push(req.files[i].filename)
        }
        let data = await ProductModal.findOneAndUpdate({pid:id},{$set:{mainCategory:mainCat, subCategory:subCat, stock:stock, price:price, desc:description, subImages:image}}).exec()
        data.subImages.forEach(element => {
            fs.unlink(`./images/${element}`,(err => {
                if(err) throw err
            }))
        })
        res.json({status:200})
    }
    else if(state === 'TEXT+MAIN+SUB'){
        let image = []
        for( let i = 1; i<req.files.length; i++){
            image.push(req.files[i].filename)
        }
        let data = await ProductModal.findOneAndUpdate({pid:id},{$set:{mainCategory:mainCat, subCategory:subCat, stock:stock, price:price, desc:description, mainImage:req.files[0].filename, subImages:image}}).exec()
        fs.unlink(`./images/${data.mainImage}`,(err => {
            if(err) throw err
        }))
        data.subImages.forEach(element => {
            fs.unlink(`./images/${element}`,(err => {
                if(err) throw err
            }))
        })
        res.json({status:200})
    }
    else {
        res.json({status:404})
    }
}

const updateProductStatus = async(req,res) => {
    console.log(req.body)
    const { pid, status } =req.body
    await ProductModal.findOneAndUpdate({pid:pid},{$set:{status:status}})
    res.json({status:200})
}

const deleteProduct = async(req,res) => {
    let data = await ProductModal.findOneAndDelete({pid:req.query.id}).exec()
    fs.unlink(`./images/${data.mainImage}`,(err => {
        if(err) throw err
    }))
    data.subImages.forEach(element => {
        fs.unlink(`./images/${element}`,(err => {
            if(err) throw err
        }))
    })
    res.json({status:200})
}

const checkProduct = async(req,res,next) => {
    console.log(req.query)
    if(req.query.status === 'true'){
        req.body.info = await ProductModal.find({mainCategory:req.query.category, subCategory: req.query.subCategory})
        next()
    }
    else{
        req.body.info = await ProductModal.find({mainCategory:req.query.category})
        next()
    }
}

module.exports = {
    getProducts,
    addProducts,
    updateProducts,
    updateProductStatus,
    deleteProduct,
    checkProduct
}