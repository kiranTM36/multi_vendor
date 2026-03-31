const mongoose = require('mongoose')
const { type } = require('node:os')

const vendorSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNo : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    // image : {
    //     type : String,
    // }
})

module.exports = mongoose.model("Vendor" , vendorSchema)