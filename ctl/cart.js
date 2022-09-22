var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var authenticated = req.session.authenticated

    if (authenticated) {
        var cart = await db.cart.findOne({
            where: {userId: req.session.user.id},
            include: db.product
        })

        var cb = ({id, name, cost, img, cart_item: {amount}}) => (
            {id, name, cost, img, amount}
        )

        var items = cart.products.map(cb)
    }

    res.locals = {authenticated, items, ...res.locals}
    res.render('cart')
}

module.exports.post = async function (req, res) {
    var templates = req.body

    var products = await db.product.findAll({
        where: {id: templates.map(({id}) => id)}
    })

    var cb = ({id, name, cost, img}) => {
        var {amount} = templates.find(_ => _.id == id)

        return {id, name, cost, img, amount}
    }

    var items = products.map(cb)

    res.json(items)
}




module.exports.add = async (req, res) => {
    var add_authenticated = async ({id, amount}) => {
        var user = await db.user.findByPk(req.session.user.id),
            cart = await user.getCart({include: db.product})

        var items = await cart.getProducts()

        console.log(items)

        for (var item of items) {
            if (item.id == id) {
                console.log('LOL-')
                var new_amt = item.cart_item.amount + +amount
                var c = item.cart_item
                console.log(c.toJSON())
                await c.update({amount: new_amt})
                return
            }
        }
    }

    var add_unauthenticated = ({id, amount}) => {
        req.session.templates ??= Array()

        var template = req.session.templates.find(_ => _.id == id)

        template
            ? template.amount += +amount
            : req.session.templates.unshift({id, amount: +amount})
    }

    req.session.authenticated
        ? await add_authenticated(req.body)
        : add_unauthenticated(req.body)

    res.json(req.session)
}
