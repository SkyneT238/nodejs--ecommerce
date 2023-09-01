'use strict'
const httpStatusCode = require('../utils/httpStatusCode/index')

// const ReasonStatusCode = { 
//     CONFLICT:"CONFLICT",
//     FORBIDDEN:"FORBIDDENT"
// }

// const StatusCode = {
//     CONFLICT:409,
//     FORBIDDEN:401
// }
class ErrorResponse extends Error{
    constructor(message,status){
        super(message);
        this.status = status
    }
}


class ConflictRequestError extends ErrorResponse{
    constructor(message = httpStatusCode.ReasonPhrases.CONFLICT, statusCode = httpStatusCode.StatusCodes.CONFLICT)
    {
        super(message,statusCode)
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message = httpStatusCode.ReasonPhrases.FORBIDDEN, statusCode = httpStatusCode.StatusCodes.FORBIDDEN)
    {
        super(message,statusCode)
    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message = httpStatusCode.ReasonPhrases.AuthFailureError, statusCode = httpStatusCode.StatusCodes.AuthFailureError)
    {
        super(message,statusCode)
    }
}




module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError
}