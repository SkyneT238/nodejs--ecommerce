require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {default: helmet } = require('helmet')
const compression = require('compression')
const app = express()


//init middleware
app.use(morgan("short"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")

//init db
require('./dbs/init.mongodb')
const {checkOverload } = require('./helpers/check.connect')
// checkOverload()
//init routers
app.use('',require('./Routers'))
//hadling error

module.exports = app