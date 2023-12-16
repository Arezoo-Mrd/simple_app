// const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "node-complete",
//     password: "arezoo1234",
//     port: 3306
// })


// module.exports = pool.promise()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'node-complete',
    'root',
    'arezoo1234',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize
