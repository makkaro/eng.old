module.exports = function (sqlz, DataTypes) {
    var unit = sqlz.define('unit', {
        img: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    unit.associate = function (db) {
        this.belongsTo(db.inv)
        this.hasMany(db.subunit)
    }

    unit.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    unit.addScope('full', Object.create(null))

    return unit
}
