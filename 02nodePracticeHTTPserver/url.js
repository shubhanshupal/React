const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res)=>{
    if (req.url === '/favicon.ico' || req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
        res.end();
        return;
    }

    const log = `${Date.now()}: ${req.url} New request hitted!\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        const parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl.query.name);
        res.end('Hello, '+ parsedUrl.query.name);
    })
});

myServer.listen(8001,()=>{
    console.log('server created!');
})
