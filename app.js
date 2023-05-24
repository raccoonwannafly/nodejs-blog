require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./server/config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

app.use(express.static('public'))


// Template engine:
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Landing => Load main.js
app.use('/', require('./server/routes/main.js'))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})