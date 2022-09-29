module.exports = function (sqlz, DataTypes) {
    var item = sqlz.define('item', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {min: 0, max: 9999}
        }
    })

    item.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    item.addScope('full', {})

    return item
}
