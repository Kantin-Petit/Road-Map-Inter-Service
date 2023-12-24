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
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'admin_service', 'user']],
                    msg: "Le rôle doit être 'admin', 'admin_service' ou 'user'"
                }
            }
          })
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            checkServiceId() {
                if (this.role !== 'admin' && (this.serviceId === null || this.serviceId <= 0)) {
                    throw new Error("serviceId ne peut être null que si le rôle est 'admin' et doit être supérieur ou égal à 1 pour les autres rôles.");
                }
            }
        }
    }
}, { timestamps: false, deletedAt: false, paranoid: true } );


module.exports = User