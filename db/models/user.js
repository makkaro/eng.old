module.exports = function (sqlz, DataTypes) {
    var user = sqlz.define('user', {
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        pass: {
            type: DataTypes.BLOB
        },
        salt: {
            type: DataTypes.BLOB
        }
    })

    user.addScope('defaultScope', {
        attributes: {
            exclude: ['pass', 'salt']
        }
    })

    user.addScope('full', {})

    return user
}