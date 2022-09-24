var db = require('../db')


/* -------------------------------------------------------------------------- */

module.exports.view = async (req, res) => {
    var {authenticated, templates} = req.session,
        {cartId, ...user} = req.session.user

    var records = undefined

    if (authenticated) {
        var cart = await db.cart.findByPk(cartId, {include: db.product})

        records = cart.products
    } else {
        if (templates?.length) {
            records = await db.product.findAll({
                where: {id: templates.map($ => $.id)}
            })
        }
    }

    var items = records?.map(({id, name, cost, img, item: {amount}}) => {
        return {id, name, cost, img, amount}
    })

    res.locals = {items, authenticated, user: {id, username}, ...req.locals}

    res.render('cart')
}

function items_from(records) {
    if (!records?.length) return undefined

    return records.map(({id, name, cost, img, item: {amount}}) => {
        return {id, name, cost, img, amount}
    })
}


/* -------------------------------------------------------------------------- */

module.exports.update = async (req, res) => {

}
