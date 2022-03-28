const ProductModal = require('../database/Product')
const fs = require('fs')


const getProducts = async(req,res) => {
    ProductModal.find({},(err,data)=> {
        if(err) res.json({status:404})
        else res.json({status:200, data:data, protocol:`${req.protocol}://${req.get('host')}/`})
    })
}


const addProducts = async(req,res) => {
    const {id, name, stock ,price, description} = req.body
    let image = []
    for( let i = 0; i<req.files.length; i++){
        image.push(req.files[i].filename)
    }
    let ins = new ProductModal({pid:id, name:name, stock:stock, price:price, desc: description, images:image})
    ins.save( err => {
        if(err) res.json({status:404})
        else res.json({status:200})
    })
}

const updateProducts = async(req,res) => {
    const {id, name, stock ,price, description, state} = req.body
    if(state === 'false'){
        await ProductModal.findOneAndUpdate({pid:id},{$set:{stock:stock, price:price, desc:description}})
        res.json({status:200})
    }
    //Note - Issuse in Updatin the images
    else {
        let image = []
        for( let i = 0; i<req.files.length; i++){
            image.push(req.files[i].filename)
        }
        let data = await ProductModal.findOneAndUpdate({pid:id},{$set:{stock:stock, price:price, desc:description, images:image}}).exec()
        data.images.forEach(element => {
            fs.unlink(`./images/${element}`,(err => {
                if(err) throw err
            }))
        })
        res.json({status:200})
    }
}

const deleteProduct = async(req,res) => {
    let data = await ProductModal.findOneAndDelete({pid:req.query.id}).exec()
    data.images.forEach(element => {
        fs.unlink(`./images/${element}`,(err => {
            if(err) throw err
        }))
    })
    res.json({status:200})
}

module.exports = {
    getProducts,
    addProducts,
    updateProducts,
    deleteProduct
}