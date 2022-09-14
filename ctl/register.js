var db = require('../db'),
    errors = require('../errors')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    res.render('register')
}

module.exports.post = async function (req, res) {
    if (await db.user.findOne({where: {username: req.body.username}})) {
        throw errors.bad_request('username taken')
    }

    var user = await db.user.create({
        username: req.body.username,
        password: req.body.password
    })

    req.session.authenticated = true
    req.session.user = user

    res.redirect('/')
}
