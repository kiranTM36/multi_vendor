const express = require('express')
const bcrypt = require('bcrypt')

const customerModel = require('./../model/customerModel')

const router = express.Router()

//Signup Route
router.post('/signup',async (req, res) => {
    try {
        const data = req.body
        const newCustomer = new customerModel(data)
        const response = await newCustomer.save()

        console.log("Register Sucessfully")
        res.status(200).json({message : "Register Sucessfully", response})
    } catch (error) {
        console.log("Error"+error)
        res.status(500).json({message : "Internal error"})
    }
})

//Login Route
router.post('/login',async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await customerModel.findOne({email : email})

        if(!user) return res.status(404).json({message : "User Not Found"})

        const isMatchPass = bcrypt.compare(password, user.password)

        if(!isMatchPass) return res.status(404).json({message : "Invalid Password"})

        console.log("Login Sucessfully")
        res.status(200).json({message : "Login Sucessfully Welcome"+user.username
        })
    } catch (error) {
        console.log("Error")
        res.status(500).json({message : "Internal error"})
    }
})

//update Route
router.put('/update/:id',async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const user = await customerModel.findByIdAndUpdate(id , data, {
            runValidators : true,
            returnDocument : true
        })

        console.log("Update Sucessfully")
        res.status(200).json({message : "update Sucessfully Welcome"+user.username
        })
    } catch (error) {
        console.log("Error")
        res.status(500).json({message : "Internal error"})
    }
})

//get Route
router.get('/all',async (req, res) => {
    try {
        const response = await customerModel.find()
        console.log("Data fetch Sucessfully")
        res.status(200).json({response})
    } catch (error) {
        console.log("Error")
        res.status(500).json({message : "Internal error"})
    }
})


module.exports = router