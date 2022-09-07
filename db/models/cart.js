module.exports = function (sqlz, DataTypes) {
    var cart = sqlz.define('cart', {})
    cart.associate = function (models) {
        this.belongsToMany(models.product, {through: models.cart_item})
    }
    return cart
}
