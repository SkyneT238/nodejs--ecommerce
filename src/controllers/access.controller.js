'use strict'

const AccessService = require("../services/access.service");
const { CREATED } = require("../core/success.response");

class AccessController{
    
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