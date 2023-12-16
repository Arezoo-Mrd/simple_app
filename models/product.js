// **Model with mongodb
const { getDb } = require("./../util/database")
class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb()
    return db.collection('products').insertOne(this).then(res => {
      console.log('res in save method', res)
    })
      .catch(err => console.log('%c err', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err))
  }
}



module.exports = Product