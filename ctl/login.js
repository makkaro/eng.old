var db = require('../db'),
    errors = require('../errors')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var view_data = Object.create(null)

    if (req.session.authenticated) {
        view_data.user = req.session.user
    }

    res.render('login', {view_data})
}

module.exports.post = async function (req, res) {
    var user = await db.user.scope('full').findOne({
        where: {username: req.body.username}
    })

    if (!user || await user.unauthenticated(req.body.password)) {
        throw errors.unauthorized('invalid credentials')
    }

    req.session.authenticated = true
    req.session.user = user
    res.redirect('/')
}
