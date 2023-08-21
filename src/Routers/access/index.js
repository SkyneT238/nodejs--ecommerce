'use strict'

const express = require('express')
const router = express.Router()
const accessControler = require('../../controllers/access.controller')

//signUp
router.post('/shop/signup', accessControler.signUp )

module.exports = router