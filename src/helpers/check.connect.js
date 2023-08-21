'use strict'

const { log } = require('console')
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000
//count connect
const coutConnect = () =>{
    const numConnect = mongoose.connections.length
    console.log(`number of connection :: ${numConnect}`);
}

//check overload 

const checkOverload = () =>
{
    setInterval(()=>
    {
        const numConnect = mongoose.connections.length;
        const numberCore = os.cpus().length;
        const memoryUse = process.memoryUsage().rss;
        // calculate ability of server
        const maxConnections = numberCore*5;

        console.log(`active connection ${numConnect}`);
        console.log(`memory used :: ${memoryUse/1024/1024} MB`);

        if(maxConnections < numConnect)
        {
            console.log("Connection overload detected !");
        }
        else
        {

        }
    },_SECONDS); //Monitor every 5 seconds 
}

module.exports = {
    coutConnect,
    checkOverload
}