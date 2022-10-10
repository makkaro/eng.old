var util = require('util')

var db = require('../db'),
    errors = require('../errors')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    console.log(errors)

    res.locals.user = undefined

    if (req.session.authenticated) {
        res.locals.user = req.session.user
    }

    res.render('login')
}


/* -------------------------------------------------------------------------- */
module.exports.create = async (req, res) => {
    var user = await db.user.scope('full').findOne({
        where: {username: req.body.username}
    })

    if (!user || await user.unauthenticated(req.body.password)) {
        throw errors.Unauthorized('Invalid credentials.')
    }

    if (req.session.templates && (!user.items || user.items.length < 1)) {
        for (var template of req.session.templates) {
            await db.item.create({
                amount: template.amount,
                productId: template.id,
                userId: user.id
            })
        }

        delete req.session.templates
    }

    req.session.user = {id: user.id, username: user.username}

    req.session.authenticated = true

    res.redirect('/store')
}


/* -------------------------------------------------------------------------- */
module.exports.destroy = async (req, res) => {
    await util.promisify(req.session.destroy).call(req.session)

    res.redirect('/login')
}
