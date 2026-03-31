const express = require('express')

const db = require('./db')
const customerRoute = require('./route/customerRoute')
// const vendorRoute = require('./route/vendorRoute')

const app = express()
const PORT = 3500

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/' , (req, res) => {
    res.send("Welcome")
})

// app.use('/vendor',vendorRoute)
app.use('/customer', customerRoute)

app.listen(PORT, ()=> {
    console.log("App started")
})
