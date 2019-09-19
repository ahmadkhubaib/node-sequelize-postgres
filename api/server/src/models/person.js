'use strict';

module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Person;
};
