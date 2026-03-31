const express = require('express')
const productModel = require('./../model/productModel')
const uploads = require('./../multer/upload')

const router = express.Router()

router.post('/create',uploads.single('image'),async (req, res) => {
    try {
        const newProduct = new product ({
             title : req.body.title,
             description : req.body.description,
            image : req.file ? `uploads/${req.file.filename}` : ""
        })

        const saved = await newProduct.save()

        res.status(200).json({message : "Product listed", saved})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" })
    }
})

module.exports = router