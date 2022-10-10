module.exports = function (sqlz, DataTypes) {
    var subunit = sqlz.define('subunit', {})

    subunit.associate = function (db) {
        this.belongsTo(db.unit)
        this.hasMany(db.variant)
    }

    subunit.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    subunit.addScope('full', Object.create(null))

    return subunit
}
