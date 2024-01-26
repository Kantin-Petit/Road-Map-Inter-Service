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
    description: {
        type: DataTypes.TEXT(),
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
}, { timestamps: false, deletedAt: true, paranoid: true });

module.exports = Thematic