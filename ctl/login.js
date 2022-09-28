var util = require('util')

var db = require('../db'),
    errors = require('../errors')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    res.locals.user = undefined

    if (req.session.authenticated) {
        res.locals.user = req.session.user
    }

    res.render('login')
}


/* -------------------------------------------------------------------------- */
module.exports.create = async (req, res) => {
    var user = await db.User.scope('withItems').findOne({
        where: {username: req.body.username}
    })

    console.log(user.items)

    if (!user || await user.unauthenticated(req.body.password)) {
        throw errors.Unauthorized('Invalid credentials.')
    }

    if (req.session.templates && user.items.length < 1) {
        for (var template of req.session.templates) {
            console.log(template)
            await db.Item.create({
                UserId: user.id,
                ProductId: template.id,
                amount: template.amount
            })
        }

        delete req.session.templates
    }

    req.session.user = {id, username} = user

    req.session.authenticated = true

    res.redirect('/store')
}


/* -------------------------------------------------------------------------- */
module.exports.destroy = async (req, res) => {
    await util.promisify(req.session.destroy).call(req.session)

    res.redirect('/login')
}
