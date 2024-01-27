const express = require('express');
const app = express();
const path = require('path')
const userRoutes = require('./routes/user')
const { mongoConnect } = require('./connection')

mongoConnect('mongodb://127.0.0.1:27017/blogging-app').then(e => console.log('mongodb connected.'))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.render('home')
})
app.use('/user', userRoutes)
// server
app.listen(8000, () => console.log("server started.."))