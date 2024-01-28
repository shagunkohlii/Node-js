const express = require('express');
const app = express();
const cookiParser = require('cookie-parser')
const path = require('path')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')
const { mongoConnect } = require('./connection');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/auth');

mongoConnect('mongodb://127.0.0.1:27017/blogging-app').then(e => console.log('mongodb connected.'))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))


app.get('/', (req, res) => {
  return res.render('home', {
    user: req.user,
  })
})
app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

// server
app.listen(8000, () => console.log("server started.."))