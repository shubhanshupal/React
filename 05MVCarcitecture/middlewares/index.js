const fs =  require('fs');
function logReqRes(filename) {
    return (req, res, next) => {

        const log = `Date:${new Date().toISOString()}, Ip: ${req.ip}, Methode: ${req.method}, Url: ${req.url}`;

        fs.appendFile(filename, log, (err) => {
            next();
        })
    }
}

module.exports = {
    logReqRes,
}