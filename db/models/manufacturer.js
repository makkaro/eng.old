module.exports = function (sqlz, DataTypes) {
    var manufacturer = sqlz.define('manufacturer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    manufacturer.associate = function (db) {
        this.hasMany(db.product)
    }

    manufacturer.addScope('defaultScope', {
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        }
    })

    manufacturer.addScope('full', Object.create(null))

    return manufacturer
}
