const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const productSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    }
},{timestamps : true})


module.exports = mongoose.model("product",productSchema)