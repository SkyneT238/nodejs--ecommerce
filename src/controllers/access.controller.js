'use strict'

const AccessService = require("../services/access.service");

class AccessController{
    
    signUp = async(req,res,next) =>{
        try{
            console.log(`[P]::signUp::`,req.body);
            console.log(req.body.name)
            return res.status(201).json(await AccessService.signUP(req.body))
        } catch(error)
        {
            next(error)
        }
    }
}

module.exports = new AccessController()