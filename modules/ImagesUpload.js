const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const { checkout } = require('../routes/Products')
const dir = './images'


var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, dir)
    },
    filename: function (req, file, cb){
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4()+'-'+filename)
    }
})

const uploadImages = multer({
    storage: storage,
    fileFilter:(req, file, cb) => {
        if(file.originalname.match(/\.(png|PNG|jpg|JPG|jpeg|JPEG|webp|WEBP)$/)) {
            cb(null,true)
        }else {
            cb(null,false)
        }
    }
})

module.exports = uploadImages