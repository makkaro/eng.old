module.exports = function (sqlz, DataTypes) {
    var cart_item = sqlz.define('cart_item', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })
    return cart_item
}
