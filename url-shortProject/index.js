const express = require('express');
const urlRoute = require('./routes/url')
const { mongoConnect } = require('./connection');
// const ejs = require('ejs')
const path = require('path')
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter')
const app = express();
const PORT = 8001;

mongoConnect('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("Mongodb connected.."))
// middleware to support form data
app.use(express.urlencoded({extended: false}))
// middleware to support json data
app.use(express.json())
app.use('/url', urlRoute)

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))
// server side rendering... 
app.use('/', staticRoute);

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         Urls : allUrls,
//     });
// })


app.listen(PORT, () => console.log(`Server Started.. at port ${PORT}`));