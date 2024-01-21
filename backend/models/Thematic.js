const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Thematic = connection.define('Thematic', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true,
    },
    file_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
}, { timestamps: false, deletedAt: true, paranoid: true });


module.exports = Thematic