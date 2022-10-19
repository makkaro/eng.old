module.exports = function (sqlz, DataTypes) {
    var element = sqlz.define('element', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    element.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    element.addScope('full', Object.create(null))

    return element
}
