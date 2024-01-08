const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req,res)=>{

    const log = ` ${Date.now()} : ${req.url} , new request received\n`;
    fs.appendFile('log.txt', log, (err,data)=>{
        switch(req.url){
            case '/': res.end("hello from home page");
            break;
            case '/contact' : res.end("hello from contact page")
            break;
            default : res.end("404 not found")
        }        
    })
    // console.log(req.on);
})
myServer.listen(8001, ()=>{ console.log("server started")})