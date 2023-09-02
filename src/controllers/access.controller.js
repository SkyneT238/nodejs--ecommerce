'use strict'

const AccessService = require("../services/access.service");
const { CREATED, OK ,SuccessResponse} = require("../core/success.response");

class AccessController{
    
    login = async(req,res,next) =>{
        new SuccessResponse({
            message : 'Login succesfully',
            metadata : await AccessService.login(req.body),
        }).send(res)
    }
    signUp = async(req,res,next) =>{
        new CREATED({
            message : 'Registered oke',
            metadata : await AccessService.signUP(req.body),
            options:{
                limit : 10
            }
        }).send(res)
    }
}

module.exports = new AccessController()