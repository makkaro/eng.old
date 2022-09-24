module.exports = function (sqlz, DataTypes) {
    var Category = sqlz.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Category.addScope('defaultScope', {
        attributes: {include: Array('name')}
    })

    Category.addScope('full', {})

    Category.associate = function (db) {
        this.hasMany(db.Product)
    }

    return Category
}
