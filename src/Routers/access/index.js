'use strict'

const express = require('express')
const router = express.Router()
const accessControler = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')

//signUp
router.post('/shop/signup', asyncHandler(accessControler.signUp))

router.post('/shop/login', asyncHandler(accessControler.login))
module.exports = router