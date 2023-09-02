'use strict'

const httpStatusCode = require('../utils/httpStatusCode/index')

class SuccessResponse {
    constructor({message, statusCode = httpStatusCode.StatusCodes.OK , reasonStatusCode = httpStatusCode.ReasonPhrases.OK, metadata ={}}){
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;

    }

    send(res,header={}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse{
    constructor({message}){
        super({message,metadata})
    }
}

class CREATED extends SuccessResponse{
    constructor({options = {}, message, statusCode = httpStatusCode.StatusCodes.CREATED, reasonStatusCode = httpStatusCode.ReasonPhrases.CREATED,metadata}){
        super({message,statusCode,reasonStatusCode,metadata})
        this.options = options
    }
}


module.exports = {
    OK,
    CREATED,
    SuccessResponse
}