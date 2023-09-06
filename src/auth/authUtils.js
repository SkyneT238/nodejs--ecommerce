'use strict'

const HEADER = {
    API_KEY:'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'authorization'
}

const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.services')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload,privateKey, {
            algorithm: 'RS256',
            expiresIn : '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm : 'RS256',
            expiresIn : '7 days'
        })


        //

        JWT.verify(accessToken,publicKey ,(err,decode) => {
            if(err)
                console.error('erorr', err)
            else 
                console.log('decode',decode)
        })
        return {accessToken,refreshToken}
    } catch (error) {
        
    }
}

const authentication = asyncHandler(async(req,res,next)=>{
    // checking uiserId missing 
    // get accessToken 
    // verifyToken 
    // Check user in bds 
    // check keystore with this userId
    // OK -> RETURN NEXT()
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError("Invalid request");
 
    const keyStore = await KeyTokenService.findByUserId(userId);
    if(!keyStore) throw new NotFoundError("Not found keyStore");

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) throw new AuthFailureError("Invalid request");



    try {
        const decodeUser = JWT.verify(accessToken,keyStore.publicKey);
        if(userId !== decodeUser.userId) throw new AuthFailureError("Invalid userId");
        req.keyStore = keyStore; // create new keystore of req to use it all session 

        return next()
    } catch (error) {
        throw error
    }

})

module.exports = {
    createTokenPair,
    authentication
}