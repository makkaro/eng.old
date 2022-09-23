var db = require('../db')


/* -------------------------------------------------------------------------- */

module.exports.view = async function (req, res) {
    var authenticated = req.session.authenticated

    var item = await db.product.findByPk(req.params.id)

    res.locals = {authenticated, item, ...res.locals}

    res.render('product')
}


/* -------------------------------------------------------------------------- */

module.exports.update = async (req, res) => {
    var args = Array(req.body.id, +req.body.diff)

    req.session.authenticated
        ? await update_db(req.session.user, ...args)
        : update_session(req, ...args)

    if (req.session.authenticated) {
        var result = (await db.cart.findOne({
            where: {userId: req.session.user.id},
            include: db.product
        })).toJSON()
    }

    res.json({db: result, session: req.session.templates})
}


async function update_db(user, id, diff) {
    var cart = await db.cart.findOne({
        where: {userId: user.id},
        include: db.product
    })

    var item = cart.products.find(_ => _.id == id)?.cart_item

    item
        ? await item.update({amount: item.amount + diff})
        : await db.cart_item.create({
            cartId: cart.id,
            productId: id,
            amount: diff
        })
}


function update_session(req, id, diff) {
    req.session.templates ??= Array()

    var template = req.session.templates.find(_ => _?.id == id)

    template
        ? template.amount += diff
        : req.session.templates.unshift({id, amount: diff})
}
