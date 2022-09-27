var db = require('../db'),
    errors = require('../errors')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    res.render('register')
}


/* -------------------------------------------------------------------------- */
module.exports.create = async (req, res) => {
    var {username, password} = req.body

    if (await db.User.findOne({where: {username}})) {
        throw errors.BadRequest('Username taken.')
    }

    var user = await db.User.create({username, password})

    req.session.user = {id, username} = user

    req.session.authenticated = true

    res.redirect('/login')
}
