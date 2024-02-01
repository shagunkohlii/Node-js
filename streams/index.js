const express = require('express');
const app = express();
const fs = require('fs');
const Port = 8000;

// zip file 
const zlib = require('zlib');

// express status monitor
const status = require('express-status-monitor');

app.use(status())

// zip file stream
fs.createReadStream('./sample.txt').pipe(
    zlib.createGzip().pipe(fs.createWriteStream('./sample.zip'))
);

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());
})

app.listen(Port, () => console.log(`server started at port ${Port}`))