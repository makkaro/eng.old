var db = require('../db')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    var {authenticated, user, templates} = req.session

    var items = undefined, records = undefined

    if (authenticated) {
        records = (await db.user.scope('withItems').findByPk(user.id)).items

        items = records.map(({name, img, subtotal}) => ({name, img, subtotal}))
    } else {
        if (templates && templates.length) {
            records = await db.product.findAll({
                where: {
                    id: templates.map($ => $.id)
                },
                order: [['name', 'ASC']]
            })

            items = records.map(({id, name, cost, img}) => {
                var {amount} = templates.find($ => $.id == id)

                var subtotal = cost * amount

                return {name, img, subtotal}
            })
        }
    }

    if (!items) {
        res.redirect('/store/cart')
    }

    var total = items.reduce((prev, $) => prev + $.subtotal, 0)

    var parsePLN = val => val.toString().replace(/\d{2}$/, '.$& zł')

    res.locals = {items, total, parsePLN, ...res.locals}

    res.render('order')
}
