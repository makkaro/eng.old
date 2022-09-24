module.exports = function (sqlz, DataTypes) {
    var Item = sqlz.define('Item', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {min: 0, max: 9999}
        }
    })

    Item.addScope('defaultScope', {
        attributes: {include: Array('amount')}
    })

    Item.addScope('full', {})

    return Item
}
