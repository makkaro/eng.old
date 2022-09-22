
/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var cart = sqlz.define('cart', {})

    cart.associate = function (db) {
        this.belongsToMany(db.product, {through: db.cart_item})
        this.belongsTo(db.user, {foreignKey: {allowNull: false}})
    }

    return cart
}
