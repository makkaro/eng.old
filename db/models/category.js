module.exports = function (sqlz, DataTypes) {
    var category = sqlz.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    category.associate = function (db) {
        this.hasMany(db.product)
    }

    category.addScope('defaultScope', {
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        }
    })

    category.addScope('full', Object.create(null))

    return category
}
