'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.services")
const { createTokenPair } = require("../auth/authUtils")
const {getInfoData} = require("../utils/index")
const { BadRequestError } = require("../core/error.response")

const RoleShop = {
    SHOP : '0001',
    WRITER :'0002',
    EDITOR : '0003',
    ADMIN : '0004'
}
class AccessService {
    static signUP = async ({name,email,password}) =>{
       
        // check email exits 
        
        const holderShop = await shopModel.findOne({ email }).collation({ locale: 'en', strength: 1 }).lean();

        if(holderShop)
        {
           throw new BadRequestError('Error: Shop already exits ')
        }
        
        const passwordHash = await bcrypt.hash(password,10);
        const newShop = await shopModel.create({
            name,email, password : passwordHash , role : [RoleShop.SHOP]
        })

        if(newShop){
            //create private key and public key 
            const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                modulusLength: 4096,
                publicKeyEncoding:{
                    type:'pkcs1',
                    format:'pem'
                },
                privateKeyEncoding:{
                    type:'pkcs1',
                    format:'pem'
                },

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
            const publicKeyObject = crypto.createPublicKey(publicKeyString);

            //create token
            const tokens = await  createTokenPair({userId: newShop._id,email},publicKeyString,privateKey);
            return {
                code : 201 ,
                metadata : {
                    shop : getInfoData({fields:['_id','name','email'],object: newShop}),
                    tokens
                }
            }
        }   

        return {
            code : 200,
            metadata : null 
        }
            
        
    }
}

module.exports = AccessService