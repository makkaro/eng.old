
/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var manufacturer = sqlz.define('manufacturer', {
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

    manufacturer.associate = function (db) {
        this.hasMany(db.product)
    }

    return manufacturer
}
