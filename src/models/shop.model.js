'use strict'

const mongoose = require('mongoose'); // Erase if already required
const {Schema,model,type} = require('mongoose');

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME='Shops'

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength: 150,
        trim : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum :['active','inactive'],
        default:'inactive'
    },
    verfify:{
        type:Schema.Types.Boolean,
        default:false
    },
    roles:{
        type:Array,
        default:[]
    } 
},
    {
        timestamps:true,
        collation: COLLECTION_NAME
    }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);