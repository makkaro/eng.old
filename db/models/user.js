var crypto = require('crypto')

module.exports = function (sqlz, DataTypes) {
    var user = sqlz.define('user', {
        login: {
            type: DataTypes.STRING,
            unique: true,
            validate: {is: /^[_a-z\d]+$/i, len: [1, 32]}
        },
        pass: {
            type: DataTypes.BLOB
        },
        salt: {
            type: DataTypes.BLOB
        }
    }, {timestamps: false})

    user.prototype.authenticated = function (pass) {
        return crypto.timingSafeEqual(
            this.pass,
            crypto.pbkdf2Sync(pass, this.salt, 310000, 32, 'sha256')
        )
    }

    user.beforeCreate(async function (user) {
        if (typeof user.pass != 'string') {
            throw Error('Wystąpił błąd.')
        }
        if (user.pass.length < 8) {
            throw Error('Zbyt krótkie hasło.')
        }
        if (user.pass.length > 64) {
            throw Error('Zbyt długie hasło')
        }
        var salt = crypto.randomBytes(16)
        user.pass = crypto.pbkdf2Sync(user.pass, salt, 310000, 32, 'sha256')
        user.salt = salt
    })

    user.associate = function (models) {

    }

    return user
}
