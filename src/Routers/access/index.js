'use strict'

const express = require('express')
const router = express.Router()
const accessControler = require('../../controllers/access.controller')
const  {asyncHandler}  = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

//signUp
router.post('/shop/signup', asyncHandler(accessControler.signUp))

//login
router.post('/shop/login', asyncHandler(accessControler.login))


//authentication 
router.use(authentication)
//logout 

router.post('/shop/logout', asyncHandler(accessControler.logout))


module.exports = router