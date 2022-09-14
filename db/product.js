
/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var product = sqlz.define('product', {
        hidden: {
            type: data_types.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        name: {
            type: data_types.STRING,
            allowNull: false
        },
        cost: {
            type: data_types.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        img: {
            type: data_types.STRING,
            allowNull: false,
            defaultValue: 'product-def.png'
        }
    })

    product.associate = function (db) {
        this.belongsTo(db.category)
        this.belongsTo(db.manufacturer)
        this.belongsToMany(db.cart, {through: db.cart_item})
    }

    return product
}
