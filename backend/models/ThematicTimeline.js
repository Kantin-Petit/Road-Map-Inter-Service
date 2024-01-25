const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const ThematicTimeline = connection.define('ThematicTimeline', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    timeline_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
            model: 'Timeline',
            key: 'id'
        }
    },
    thematic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
         unique: 'compositeIndex',
        references: {
            model: 'Thematic',
            key: 'id'
        }
    }
}, { timestamps: false });

module.exports = ThematicTimeline;