'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.services")
const { createTokenPair } = require("../auth/authUtils")
const {getInfoData} = require("../utils/index")
const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")
const { constant } = require("lodash")


/// Service ///
const RoleShop = {
    SHOP : '0001',
    WRITER :'0002',
    EDITOR : '0003',
    ADMIN : '0004'
}
class AccessService {

    static logout = async(keyStore) =>{
        console.log("hiiiiii")
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
  
        console.log(delKey);
        return delKey;
    }

    /*
        login state 
        1 check email in database 
           1.1 match password 
           create at vs rt and save
           generate tokens 
           get data return login 
         
    */
    static login = async({email, password}) =>{ //,refreshToken = null
        const foundShop = await findByEmail({email});
        if(!foundShop) throw new BadRequestError("Shop not found");

        const match = bcrypt.compare(password, foundShop.password);
        if(!match) throw new AuthFailureError("Error login");

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

        });

        const publicKeyString = await KeyTokenService.createKeyToken({
            userId : foundShop._id,
            publicKey
        });

        const tokens = await  createTokenPair({userId: foundShop._id,email},publicKeyString,privateKey);

        await KeyTokenService.createKeyToken({
            refreshToken : tokens.refreshToken, 
            publicKeyString
        });

        return {
            metadata : {
                shop : getInfoData({fields:['_id','name','email'],object: foundShop}),
                tokens
            }
        }


    }
    static signUP = async ({name,email,password}) =>{
       
        // check email exits 
        
        const holderShop = await shopModel.findOne({ email }).collation({ locale: 'en', strength: 1 }).lean();

        if(holderShop)
        {
           throw new ConflictRequestError('Error: Shop already exits ')
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