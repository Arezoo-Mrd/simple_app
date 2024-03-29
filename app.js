const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")
const Order = require('./models/order')
const OrderItem = require('./models/order-item')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
User.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, {
    through: CartItem
})
Product.belongsToMany(Cart, {
    through: CartItem
})

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {
    through: OrderItem
})



sequelize.sync({
    force: true
}).then(result => {
    return User.findByPk(1)

})
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Arezoo',
                email: 'test@test.com',
            })
        }
        return user
    }).then((user) => {
        user.createCart()

    }).then(() => {
        app.listen(8000);
    })
    .catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))


