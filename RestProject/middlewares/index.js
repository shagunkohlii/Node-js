const fs = require("fs");

function logreqres(fileName) {

    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `\n${Date.now()} : ${req.ip} : ${req.path}\n`,
            (err, data) => {
                console.log('error in middleware', err)
                next();
            })
    };
};
 
module.exports = { logreqres, };
