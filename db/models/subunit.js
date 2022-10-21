var fs = require('fs'), path = require('path')

module.exports = function (sqlz, DataTypes) {
    var subunit = sqlz.define('subunit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    subunit.associate = function (db) {
        this.belongsTo(db.unit)
        this.hasMany(db.variant)
        this.hasMany(db.element)
    }

    subunit.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    subunit.addScope('full', Object.create(null))

    return subunit
}
