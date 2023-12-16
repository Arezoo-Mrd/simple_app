const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const { mongoConnect } = require('./util/database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1).then((user) => {
    //     req.user = user;
    //     next();
    // }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
    next()
})

app.use('/admin', adminRoutes)
// app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect(() => {
    app.listen(8000)
})

