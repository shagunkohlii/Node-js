// url handling 

const http = require('http');
const fs = require('fs')
const url = require('url');   //

const myServer = http.createServer((req, res) => {
    const urldata = `${Date.now()}, ${req.method},  ${req.url} : new request received\n`;
    if (req.url === '/favicon.ico') return res.end();
    const myUrl = url.parse(req.url, true);               
    console.log(myUrl);
    fs.appendFile("./contacts.txt", urldata, (err, data) => {
        switch (myUrl.pathname) {                          
            case '/': 
                if (req.method === 'GET') res.end(`hello ${myUrl.query.username}, http method is :${req.method}`);
                break;
            case '/signup':
                if (req.method === 'GET') res.end("this is a signup page")
                else if (req.url === 'POST') {
                    // DB query to send pass or email on server..
                    res.end('success')
                }
                break;
            case '/about': res.end("hello fromm about");
                break;
            case '/contact':
                const condata = myUrl.query.username;        
                res.end(`hi ${condata}`);
                break;
            case '/search':
                // its just a object where we get data from the query obj form myUrl..... 
                const searchdata = myUrl.query.searchid;     
                res.end(`your search id is : ${searchdata}`);
                break;
            default: res.end('404 not found')
        }
    })
})

myServer.listen(8000, () => { console.log("server started..") });