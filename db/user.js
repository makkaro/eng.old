var crypto = require('crypto'),
    util = require('util')

var pbkdf2_async = util.promisify(crypto.pbkdf2),
    randomBytes_async = util.promisify(crypto.randomBytes)

var salt_size = +process.env.CR_SALT_SIZE || 16

var {CR_ITERATIONS: iterations, CR_KEY_LENGTH: key_length, CR_DIGEST: digest}
    = process.env

var params = Array(+iterations || 310000, +key_length || 32, digest || 'sha256')

/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, data_types) {
    var user = sqlz.define('user', {
        username: {
            type: data_types.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: data_types.BLOB,
            allowNull: false
        },
        salt: {
            type: data_types.BLOB,
            allowNull: false
        }
    })

    user.addScope('defaultScope', {attributes: {exclude: ['password', 'salt']}})
    user.addScope('full', {})

    user.beforeValidate(async function (user) {
        user.salt = await randomBytes_async(salt_size)

        user.password = await pbkdf2_async(user.password, user.salt, ...params)
    })

    user.prototype.unauthenticated = async function (password) {
        var hash = await pbkdf2_async(password, this.salt, ...params)

        return !crypto.timingSafeEqual(hash, this.password)
    }

    return user
}
