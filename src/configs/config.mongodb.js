'use strict'


// normal config 
// const config = {
//     app : {
//         port : 3055
//     },
//     db : {
//         host : 'localhost',
//         port : 27017,
//         name : 'db'
//     }

// }

//advanced config 
const dev = {
    app : {
        port : process.env.DEV_APP_PORT || 3052
    },
    db : {
        host : process.env.DEV_DB_HOST || "localhost",
        name : process.env.DEV_DB_NAME || 'shopDev',
        port : process.env.DEV_DB_PORT || '27017',
        
    }
}

const pro = {
    app : {
        port : process.env.PRO_APP_PORT || 3000
    },
    db : {
        host : process.env.PRO_DB_HOST || 'localhost',
        name : process.env.PRO_DB_NAME || 'shopPRO',
        port : process.env.PRO_DB_PORT || 27017
    }
} 

const config = {dev,pro};
const env = process.env.NODE_ENV || "dev"
module.exports = config[env]