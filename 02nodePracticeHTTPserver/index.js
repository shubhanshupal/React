//adding http package to the file
const http = require('http');
//adding File system package to the file
const fs = require('fs');

//Creating server and it's reference Object "myServer"
const myServer = http.createServer((req, res)=>{
    // console.log("New Request");
    // console.log(req);
    const log = `${Date.now()}: ${req.url} New Request\n`
    fs.appendFile('log.txt',log,(err, data)=>{
        switch(req.url){
            case '/': res.end("Home Page");
            break;
            case '/about': res.end('Hey this is shubhanshu');
            break;
            case '/gallery': res.end('No Photos Found');
            break;
            default: res.end('404 page not found');
            
        }
        // res.end("Hello form shubhanshu")
    })
});

//Asigning Port to the server
myServer.listen(8000,()=> console.log('Server Created'));
