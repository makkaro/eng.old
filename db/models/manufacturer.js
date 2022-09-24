module.exports = function (sqlz, DataTypes) {
    var Manufacturer = sqlz.define('Manufacturer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Manufacturer.addScope('defaultScope', {
        attributes: {include: Array('name')}
    })

    Manufacturer.addScope('full', {})

    Manufacturer.associate = function (db) {
        this.hasMany(db.Product)
    }

    return Manufacturer
}
