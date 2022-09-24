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
        where: {username: req.body.username},
        include: {model: db.cart, include: db.product}
    })

    if (!user || await user.unauthenticated(req.body.password)) {
        throw errors.unauthorized('invalid credentials')
    }

    if (req.session.templates && !(await user.cart.countProducts())) {
        for (var template of req.session.templates) await db.cart_item.create({
            cartId: user.cart.id,
            productId: template.id,
            amount: template.amount
        })

        delete req.session.templates
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        cartId: user.cart.id
    }

    req.session.authenticated = true

    res.redirect('/')
}
