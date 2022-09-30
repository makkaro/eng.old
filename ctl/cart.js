var db = require('../db')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    var {authenticated, user, templates} = req.session

    var items = undefined, total = undefined

    if (authenticated) {
        items = (await db.user.scope('withItems').findByPk(user.id)).items
    } else {
        if (templates && templates.length) {
            var records = await db.product.findAll({
                where: {id: templates.map($ => $.id)}
            })

            items = templates.map(({id, amount}) => {
                var {name, cost, img} = records.find(_ => _.id == id)

                var subtotal = cost * amount

                return {id, name, cost, img, amount, subtotal}
            })
        }
    }

    if (items) {
        total = items.reduce((prev, $) => prev + $.subtotal, 0)
    }

    var parsePLN = $ => $ / 100 + ' zł'

    res.locals = {authenticated, user, items, total, parsePLN, ...res.locals}

    res.render('cart')
}


/* -------------------------------------------------------------------------- */
module.exports.update = async (req, res) => {

}

/* -------------------------------------------------------------------------- */
module.exports.destroy = async (req, res) => {

}
