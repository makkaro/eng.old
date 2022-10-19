module.exports = function (sqlz, DataTypes) {
    var inv = sqlz.define('inv', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

        // img: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    })

    inv.associate = function (db) {
        this.hasMany(db.unit)
    }

    inv.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    inv.addScope('full', Object.create(null))

    return inv
}