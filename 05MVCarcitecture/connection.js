const mongoose = require('mongoose')

function connectMongoDb(url){
    return mongoose.connect(url).then(()=>{
        console.log("MongoDb connected successfully");
    }).catch((err)=>{
        console.log("Error in MongoDb connection :",err);
    })
}

module.exports = {connectMongoDb}