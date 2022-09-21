var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var authenticated = req.session.authenticated

    if (authenticated) {
        var cart = await db.cart.findOne({
            where: {userId: req.session.user.id},
            include: db.product
        })
    }

    res.locals = {authenticated, cart, ...res.locals}

    res.render('cart')
}

module.exports.post = async function (req, res) {
    res.json(req.body)
}
