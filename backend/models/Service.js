const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Service = connection.define('Service', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, { timestamps: false, deletedAt: true, paranoid: true } );


module.exports = Service