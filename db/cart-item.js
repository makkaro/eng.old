
/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var cart_item = sqlz.define('cart_item', {
        amount: {
            type: data_types.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })

    return cart_item
}
