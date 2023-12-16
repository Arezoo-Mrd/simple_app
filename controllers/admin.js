const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(title, imageUrl, description, price);
  // product.save().then(() => {
  //   res.redirect('/');
  // }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
  req.user.createProduct({
    title,
    price,
    description,
    imageUrl,
    // userId: req.user.id
  }).then(result => {
    console.log('%c result', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', result);
    res.redirect('/')
  }).catch(err => {
    console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err);
  })
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  }).catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({
    where: {
      id: prodId
    }
  })
    .then(products => {
      const product = products[0]
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(() => {
    Product.destroy({
      where: {
        id: prodId
      }
    })
    res.redirect('/admin/products');
  }).catch(err => {
    console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err);
  })

};