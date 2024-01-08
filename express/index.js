// const exp = require('constants');
const express = require('express');
// const http = require('http');
const { url } = require('inspector');

const app = express()
app.get('/', (req,res)=>{ 
    res.send(`hello, ${req.query.name}, HOMEPAGE`);
});

app.get('/info', (req,res)=>{
    res.send(`hiii ${req.query.name} ` + req.query.age +" "+ req.query.course)
});

app.get("/about", (req,res)=>{
    res.send(`hii from about ${req.query.userid}`)
})

// const myServer = http.createServer(app);
// myServer.listen(8000, ()=> console.log("server started..."))
app.listen(8000, ()=> console.log("server started..."))