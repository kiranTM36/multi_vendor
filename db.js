const mongoose =  require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/system");

const db = mongoose.connection

db.on('connected', ()=> {
    console.log("MongoDB connected")
})

db.on('error', (error)=> {
    console.log("MongoDB connection Error : "+error)
})

db.on('disconnected', ()=> {
    console.log("MongoDB disconnected")
})

module.exports = db