const express = require('express')
const cors = require('cors')
const app = express ()
const PORT = 4000
const DBconnect = require('./database/connect')
const CategoryRouter = require('./routes/Category')
const ProductRouter = require('./routes/Products')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('images'))
app.use('/api',CategoryRouter)
app.use('/api',ProductRouter)

DBconnect()

app.listen(PORT, function(){
    console.log(`Server Started at PORT:${PORT}`)
})