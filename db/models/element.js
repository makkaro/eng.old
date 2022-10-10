module.exports = function (sqlz, DataTypes) {
    var element = sqlz.define('element', {})

    element.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    element.addScope('full', Object.create(null))

    return element
}
