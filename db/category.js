
/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var category = sqlz.define('category', {
        hidden: {
            type: data_types.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        name: {
            type: data_types.STRING,
            allowNull: false
        }
    })

    category.associate = function (db) {
        this.hasMany(db.product)
    }

    return category
}
