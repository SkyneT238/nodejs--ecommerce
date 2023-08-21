'use strict'

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({userId,publickey}) =>
    {
        try{
            const publicKeyString = publickey.toSTring();
            const tokens = await keyTokenModel.create({
                user : userId,
                publickey : publicKeyString
            })

            return tokens ? publicKeyString : null
        }
        catch (error)
        {
            return error
        }
    }
}

module.exports = KeyTokenService