var crypto = require('crypto'),
    util = require('util')


/* -------------------------------------------------------------------------- */

var pbkdf2_async = util.promisify(crypto.pbkdf2),
    randomBytes_async = util.promisify(crypto.randomBytes)

var salt_size = +process.env.CR_SALT_SIZE || 16

var {CR_ITERATIONS: iterations, CR_KEY_LENGTH: key_length, CR_DIGEST: digest}
    = process.env

var params = Array(+iterations || 310000, +key_length || 32, digest || 'sha256')


/* -------------------------------------------------------------------------- */

module.exports = function (sqlz, DataTypes) {
    var User = sqlz.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
                len: Array(3, 16)
            }
        },
        password: {
            type: DataTypes.BLOB,
            allowNull: false,
            validate: {
                len: Array(4, 64) // TODO
            }
        },
        salt: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        items: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return this.products?.map($ => {
                    var {id, name, cost, img, item: {amount}} = $

                    return {id, name, cost, img, amount}
                })
            },
            set: function () {
                throw Error('Unable to set the value of a virtual field.')
            }
        }
    })

    User.addScope('defaultScope', {
        attributes: {include: Array('id', 'username')}
    })

    User.addScope('withItems', {
        attributes: {include: Array('id', 'username', 'items')}
    })

    User.addScope('full', {})

    User.beforeValidate(async user => {
        user.salt = await randomBytes_async(salt_size)

        user.password = await pbkdf2_async(user.password, user.salt, ...params)
    })

    User.prototype.unauthenticated = async function (password) {
        var hash = await pbkdf2_async(password, this.salt, ...params)

        return !crypto.timingSafeEqual(hash, this.password)
    }

    User.associate = function (db) {
        this.belongsToMany(db.Product, {through: db.Item})
    }

    return User
}
