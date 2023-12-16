const Product = require('../models/product');
const Cart = require("./../models/cart")

exports.getProducts = (req, res, next) => {
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId
  Product.findByPk(productId).then((product) => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
};

exports.getIndex = (req, res, next) => {
  // Product.findAll().then(([rows, fieldData]) => {
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // }).catch(err => {

  // });
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then((products) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products
      })
    }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
  }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart().then(
    cart => {
      fetchedCart = cart
      return cart.getProducts({
        where: {
          id: productId
        }
      }).then(products => {
        let product;
        if (products.length > 0) {
          product = products[0]
        }

        if (product) {
          const oldQuantity = product.cartItem.quantity
          newQuantity = oldQuantity + 1
          return product
        }
        return Product.findByPk(productId)
      }).then((product) => {
        fetchedCart.addProduct(product, {
          through: {
            quantity: newQuantity
          }
        })
      }).then(() => {
        res.redirect('/cart')
      }).catch(err => {
        console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err);
      })
    }
  ).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err));
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  req.user.getCart().then(cart => {
    cart.getProducts({
      where: {
        id: productId
      }
    }).then(products => {
      const product = products[0]
      if (product) {
        return product.cartItem.destroy()
      } else {
        res.status(404).message('ریدی حاجی')
      }
    }).then((result) => {
      res.redirect('/cart')
    })
  }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
}