var crypto = require('crypto'),
    util = require('util'),
    db = require('../../db')

var pbkdf2_async = util.promisify(crypto.pbkdf2),
    randomBytes_async = util.promisify(crypto.randomBytes)

var name = 'register'

var get = async function (req, res) {
    res.render(name)
}

var post = async function (req, res, next) {
    var pass = req.body.pass,
        saltlen = 16,
        iterations = 310000,
        keylen = 32,
        digest = 'sha256'

    var salt = await randomBytes_async(saltlen),
        hash = await pbkdf2_async(pass, salt, iterations, keylen, digest),
        user = await db.user.create({
            login: req.body.login,
            pass: hash,
            salt: salt
        })

    req.login(user, function (err) {
        if (err) return next(err)
        res.redirect('/')
    })
}

module.exports = {name, get, post}
