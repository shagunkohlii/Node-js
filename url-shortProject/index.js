const express = require('express');
const urlRoute = require('./routes/url')
const { mongoConnect } = require('./connection')

const app = express();
const PORT = 8001;

mongoConnect('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("Mongodb connected.."))

app.use(express.json())
app.use('/url', urlRoute)

 
app.listen(PORT,()=> console.log(`Server Started.. at port ${PORT}`));