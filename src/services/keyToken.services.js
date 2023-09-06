'use strict'

const keyTokenModel = require("../models/keyToken.model");
const {Types} = require('mongoose')

class KeyTokenService {
    static createKeyToken = async ({userId,publicKey,privateKey}) =>
    {
        try{
            // const publicKeyString = publicKey.toString();
            // const tokens = await keyTokenModel.create({
            //     user : userId,
            //     publicKey : publicKeyString,
               

            // })
            // console.log("thisss");
            // return tokens ? tokens.publicKey : null

            // easy case 


            //advanced case 
            const publicKeyString = publicKey.toString();
            const filter = {user : userId}, update = { 
                publicKey:publicKeyString,refreshTokensUsed : [] //refreshToken
            }, options = {upsert : true, new : true};
            // if exits it will be update , otherwise it will be insert

            const tokens = await keyTokenModel.findOneAndUpdate(filter,update,options);

            return tokens ? tokens.publicKey : null 
        }
        catch (error)
        {
            return error
        }
    }

    static findByUserId = async (userId) =>{
        return await keyTokenModel.findOne({user: new Types.ObjectId(userId)}).lean();
    }

    static removeKeyById = async (id) =>  { 
        return keyTokenModel.deleteOne({ _id: id });
    }
}

module.exports = KeyTokenService