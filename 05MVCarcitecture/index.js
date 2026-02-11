const express = require('express')
const {connectMongoDb} = require('./connection')

const {logReqRes} = require('./middlewares');

const {router} = require('./routes/student');

const app = express();
const port = 8005;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/learn-mongo-2')

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes('log.txt'));


//Routes
app.use('/student',router)
// console.log("Welcome to MVCarcitecture");
// return true;
app.listen(port,(err)=> {
    if(err){
      console.log({'Error': err})
    }
    console.log("Server is running on port :",port)
});