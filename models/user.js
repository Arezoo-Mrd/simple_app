const { DataTypes } = require('sequelize')
const sequelize = require('../util/database')
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User