const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();

// this is the fisrt middleware which will log each request to a file
app.use((req,res,next)=>{
    console.log('This is the 1st middleware!');
    fs.appendFile('log.txt',`${Date.now()}: ${req.method} :${req.path} New request hitted!\n`,(err)=>{
        next();
    });
    
});
// second middleware to add a custom property to req object
app.use((req,res,next)=>{
    req.name='Shubhanshu';
    console.log('This is the 2nd middleware!');
    next();
})
//
app.get('/', (req, res) => {
    res.send(`Hello from home page! by : ${req.name}`);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});