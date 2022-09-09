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
    return user
}