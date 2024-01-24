const express = require('express');
const { mongoConnect } = require('./connection');
// const ejs = require('ejs')
const path = require('path')
const URL = require('./models/url');
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly ,checkAuth} = require('./middlewares/auth')

const app = express();
const PORT = 8001;

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

mongoConnect('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("Mongodb connected.."))
// middleware to support form data
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// middleware to support json data
app.use(express.json())
app.use('/url', restrictToLoggedinUserOnly, urlRoute)

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))
// server side rendering... 
app.use('/',checkAuth, staticRoute);
app.use('/user', userRoute)

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         Urls : allUrls,
//     });
// })


app.listen(PORT, () => console.log(`Server Started.. at port ${PORT}`));