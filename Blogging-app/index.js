const express = require('express');
const app = express();
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/',(req, res)=>{
    return res.render('home')
})

app.listen(8000, () => console.log("server started.."))