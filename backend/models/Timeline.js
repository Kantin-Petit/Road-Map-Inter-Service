const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const Timeline = connection.define('Timeline', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    text: {
        type: DataTypes.TEXT(),
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    date_start: {
        type: DataTypes.DATE(),
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATE(),
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: false, deletedAt: true, paranoid: true });

module.exports = Timeline;