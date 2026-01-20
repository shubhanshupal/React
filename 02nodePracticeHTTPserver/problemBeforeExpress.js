/*
|--------------------------------------------------------------------------
| Problems with Plain Node.js HTTP Server (Before Express Framework)
|--------------------------------------------------------------------------
|
| 1. Manual Routing:
|    - Every route must be handled using switch/if conditions.
|    - No built-in routing system like GET(), POST(), etc.
|
| 2. Multiple res.end() Risk:
|    - Easy to accidentally send multiple responses for one request.
|    - Causes errors like: "Cannot set headers after they are sent".
|
| 3. No Middleware Support:
|    - Common tasks (logging, authentication, validation) must be
|      written manually for every request.
|
| 4. Complex URL & Query Handling:
|    - URL parsing must be done manually using url.parse().
|    - No automatic handling of params or query strings.
|
| 5. Request Body Handling is Difficult:
|    - POST/PUT request data must be collected using streams.
|    - No built-in body parsing (JSON / form data).
|
| 6. Poor Error Handling:
|    - No centralized error handler.
|    - Errors must be managed in every callback.
|
| 7. Low Readability & Scalability:
|    - Code becomes lengthy and hard to maintain as routes increase.
|    - Not suitable for large or production-level applications.
|
| Conclusion:
| Express.js solves these problems by providing routing, middleware,
| body parsing, better error handling, and cleaner structure.
|--------------------------------------------------------------------------
*/


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

        switch(req.url) {
            case '/':
                if(req.method == 'GET') res.end('Welcome to the Home Page!');
                break;
            case '/about':
                if(req.method == 'GET') {
                res.end('This is the About Page.');
                }
                break;
            case '/signup':
                if(req.method == 'GET') {
                    res.end('Signup Page');
                }
                else if(req.method == 'POST') {
                    res.end('Signup successful!');
                }
                break;
            default:
                res.statusCode = 404;
                res.end('404 Not Found');
        }
        const parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl);
        // res.end('Hello, '+ parsedUrl.query.name);
    })
});

myServer.listen(8001,()=>{
    console.log('server created!');
})
