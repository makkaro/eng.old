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
        include: db.cart
    })

    if (!user || await user.unauthenticated(req.body.password)) {
        throw errors.unauthorized('invalid credentials')
    }

    if (!user.cart) {
        user.cart = await user.createCart()


        if (req.body.cart) {
            var local = JSON.parse(req.body.cart)
        }

        if (local) {
            for (var item of local.items) {
                var product = await db.product.findByPk(item.id)
                user.cart.addProduct(product, {through: {amount: item.amount}})
            }
        }

    }

    req.session.user = await db.user.findByPk(user.id)
    req.session.authenticated = true
    res.redirect('/')
}
