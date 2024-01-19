const express = require("express");
const fs = require('fs');
const mongoose = require('mongoose');
const userRouter = require('./routes/user')
// const users = require('./MOCK_DATA.json');
const exp = require("constants");
const app = express();
const port = 8000;
const {mongoConnect} = require('./connection');
const {logreqres} = require('./middlewares');

// connection
mongoConnect('mongodb://127.0.0.1:27017/nodejs-learning')
.then(()=>{
    console.log('mongodb connected...')
})

// middleware plugin 
app.use(express.urlencoded({ extended: false }));
// middleware
app.use(logreqres('log.txt'));

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`server started... ${port}`));