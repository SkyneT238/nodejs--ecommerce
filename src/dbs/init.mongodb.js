'use strict'

const mongoose = require('mongoose')
const {db:{host,name,port}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`

const {coutConnect} = require('../helpers/check.connect')

class Database {
     constructor()
     {
        this.connect()
     }

     // connect 

     connect(type = "mongodb")
     {
        if(true)
        {
            mongoose.set('debug',true);
            mongoose.set('debug',{color:true});
        }
        mongoose.connect(connectString).then(_ => {
            console.log(`sucssect connect :: ${connectString}`,coutConnect())
        })
        .catch(err => console.log("error"))
     }

     static getInstance()
     {
        if(!Database.instance)
        {
            Database.instance = new Database();

        }

        return Database.instance
     }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb