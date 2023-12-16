// const db = require("./../util/database")

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)', [
//       this.title,
//       this.imageUrl,
//       this.description,
//       this.price
//     ]);
//   }

//   static deleteById(id) {

//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products')
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE id = ?', [id])

//   }
// };


const { DataTypes } = require('sequelize')
const sequelize = require('../util/database')

const Products = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
},)




module.exports = Products