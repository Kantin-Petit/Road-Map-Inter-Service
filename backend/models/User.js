const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM({
            values: ['admin', 'admin_service', 'user'],
            allowNull: false
          })
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        // validate: {
        //     allowNullBasedOnRole(value) {
        //         if (this.role !== 'admin') {
        //             if (value === null || value === undefined) {
        //                 throw new Error('Service ne peut être nul que pour le rôle admin');
        //             }
        //         }
        //     }
        // }
    }
}, { timestamps: false, deletedAt: false, paranoid: true } );


module.exports = User