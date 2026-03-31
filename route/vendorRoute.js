const express = require('express')

const vendorModel = require('./../model/venderModel')

const router = express.Router()

router.post('/signup' , async(req, res) => {
    try {
        const data = req.body
        const newVendor = new vendorModel(data)
        const response = await newVendor.save()

        console.log("New vendor Saved")
        res.json({message : "Sucessfully Signup", response})
    } catch (error) {
        console.log("SomeThing went Wrong")
        res.status(500).json({message : "Internal Error"})
    }
})

module.exports = router