// const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "node-complete",
//     password: "arezoo1234",
//     port: 3306
// })


// module.exports = pool.promise()


// *** connect with sequelize *//

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//     'node-complete',
//     'root',
//     'arezoo1234',
//     {
//         dialect: 'mysql',
//         host: 'localhost'
//     }
// );

// module.exports = sequelize


//**** connect to mongodb */

let _db;
const mongoConnect = (callback) => {
    const { MongoClient, ServerApiVersion } = require('mongodb')
    const uri = `mongodb+srv://ArezooMrd:3VfhHhIb8NlltqRW@cluster0.syyhifg.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    client.connect().then((client) => {
        _db = client.db()
        callback()
    }).catch(err => {
        console.log('%c error to connect database', 'background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px', err);
    })

}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw new Error('No database found ')
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb