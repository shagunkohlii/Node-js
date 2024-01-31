const { Server } = require("socket.io");

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const { Socket } = require("dgram");

const server = http.createServer(app);
const io = new Server(server);

// socket io
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        // console.log('a new message : ', message)
        io.emit('message', message);
    })
})


app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return sendFile('/public/index.html')
})

server.listen(9000, () => console.log('server started at port 9000'));