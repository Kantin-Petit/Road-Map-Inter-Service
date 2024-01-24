const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const ThematicTimeline = connection.define('ThematicTimeline', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, { timestamps: false, deletedAt: true, paranoid: true });


module.exports = ThematicTimeline;