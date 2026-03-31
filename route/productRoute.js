const express = require('express')
const productModel = require('./../model/productModel')
const uploads = require('./../multer/upload')

const router = express.Router()

// CREATE PRODUCT
router.post('/create', uploads.single('image'), async (req, res) => {
    try {
        const newProduct = new productModel({
            title: req.body.title,
            description: req.body.description,
            image: req.file ? `uploads/${req.file.filename}` : "",
            noItem: req.body.noItem
        })

        const saved = await newProduct.save()
        res.status(200).json({ message: "Product listed", saved })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" })
    }
})

// UPDATE PRODUCT
router.post('/update/:id', uploads.single('image'), async (req, res) => {
    try {
        const id = req.params.id

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            noItem: req.body.noItem
        }

        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { returnDocument: true, runValidators: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Product updated", updatedProduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" })
    }
})

router.get('/view',async (req, res) => {
    try {
        const response = await productModel.find()

        console.log("Data fetch")
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" })
    }
})

module.exports = router