var db = require('../db')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    var {authenticated, user, templates} = req.session

    var items = undefined

    if (authenticated) {
        items = (await db.user.scope('withItems').findByPk(user.id)).items
    } else {
        if (templates && templates.length) {
            var records = await db.product.findAll({
                where: {id: templates.map($ => $.id)}
            })

            items = templates.map($ => {
                var {id, amount} = $

                var {name, cost, img} = records.find(_ => _.id == $.id)

                return {id, name, cost, img, amount}
            })
        }
    }

    res.locals = {authenticated, user, items, ...res.locals}

    res.render('cart')
}


/* -------------------------------------------------------------------------- */
module.exports.update = async (req, res) => {

}
