'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const RoleShop = {
    SHOP : '0001',
    WRITER :'0002',
    EDITOR : '0003',
    ADMIN : '0004'
}
class AccessService {
    static signUP = async ({name,email,password}) =>{
        try {
        // check email exits 
        
        const holderShop =  await shopModel.findOne({email}).lean(); // lean() return js object --helpfull to reduce size of return
        if(holderShop)
        {
            return {
                code : 'xxx',
                message: 'Shop already registered !'
            }
        }
        
        const passwordHash = await bcrypt.hash(password,10);
        const newShop = await shopModel.create({
            name,email, password : passwordHash , role : [RoleShop.SHOP]
        })

        if(newShop){
            //create private key and public key 
            const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                modulusLength: 4096
            })
            console.log({privateKey,publicKey});
            console.log("hi");
        }
            
        }catch(error){
            return {
                code : 'xxx',
                message : error.message,
                status : 'error'
            }
        }
    }
}

module.exports = AccessService