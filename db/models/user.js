var crypto = require('crypto'),
    util = require('util')


/* -------------------------------------------------------------------------- */
var pbkdf2_async = util.promisify(crypto.pbkdf2),
    randomBytes_async = util.promisify(crypto.randomBytes)

var salt_size = +process.env.CR_SALT_SIZE || 16

var {CR_ITERATIONS: iterations, CR_KEY_LENGTH: key_length, CR_DIGEST: digest}
    = process.env

var args = [+iterations || 310000, +key_length || 32, digest || 'sha256']


/* -------------------------------------------------------------------------- */
module.exports = function (sqlz, DataTypes) {
    var user = sqlz.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
                len: [3, 16]
            }
        },
        password: {
            type: DataTypes.BLOB,
            allowNull: false,
            validate: { // TODO
                len: [4, 64]
            }
        },
        salt: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        items: {
            type: DataTypes.VIRTUAL,
            get: function () {
                if (this.products && this.products.length) {
                    var items = this.products.map($ => {
                        var {id, name, cost, img, item: {amount}} = $

                        var subtotal = cost * amount

                        return {id, name, cost, img, amount, subtotal}
                    })

                    return items.sort(($, _) => ($.name > _.name) ? 1 : -1)
                }

                return undefined
            },
            set: function () {
                throw Error('Unable to set the value of a virtual field.')
            }
        }
    })

    user.associate = function (db) {
        this.belongsToMany(db.product, {through: db.item})
    }

    user.prototype.unauthenticated = async function (password) {
        var hash = await pbkdf2_async(password, this.salt, ...args)

        return !crypto.timingSafeEqual(hash, this.password)
    }

    user.beforeValidate(async user => {
        user.salt = await randomBytes_async(salt_size)

        user.password = await pbkdf2_async(user.password, user.salt, ...args)
    })

    user.addScope('defaultScope', {
        attributes: {
            exclude: ['password', 'salt', 'items', 'createdAt', 'updatedAt']
        }
    })

    user.addScope('withItems', {
        attributes: {
            exclude: ['password', 'salt', 'createdAt', 'updatedAt']
        },
        include: 'products'
    })

    user.addScope('full', {
        include: 'products'
    })

    return user
}
