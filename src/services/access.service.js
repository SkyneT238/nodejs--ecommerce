'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.services")
const { createTokenPair } = require("../auth/authUtils")

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
        
        const holderShop =  false;
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
            
            const publicKeyString = await KeyTokenService.createKeyToken({
                userId : newShop._id,
                publicKey
            })

            if(!publicKeyString)
            {
                return {
                    code:'xxxx',
                    message : 'Public key errror'
                }
            }
            console.log("keyyy",publicKeyString);
            const tokens = await  createTokenPair({userId: newShop._id,email},publicKey,privateKey);
            console.log("create oke",tokens);

            return {
                code : 201 ,
                metadata : {
                    shop : newShop,
                    tokens
                }
            }
        }   

        return {
            code : 200,
            metadata : null 
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