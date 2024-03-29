var {Op} = require('sequelize')

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
                where: {
                    id: templates.map($ => $.id)
                },
                order: [['name', 'ASC']]
            })

            items = records.map(({id, name, cost, img}) => {
                var {amount} = templates.find(_ => _.id == id)

                var subtotal = cost * amount

                return {id, name, cost, img, amount, subtotal}
            })
        }
    }

    if (items) {
        total = items.reduce((prev, $) => prev + $.subtotal, 0)
    }

    var parsePLN = val => val.toString().replace(/\d{2}$/, '.$& zł')

    res.locals = {authenticated, user, items, total, parsePLN, ...res.locals}

    res.render('cart')
}


/* -------------------------------------------------------------------------- */
module.exports.update = async (req, res) => {
    var {amount} = req.body

    if (req.session.authenticated) {
        var {body: {id: productId}, session: {user: {id: userId}}} = req

        await db.item.update({amount}, {
            where: {
                [Op.and]: [{productId}, {userId}]
            }
        })
    } else {
        var {body: {id}, session: {templates}} = req

        if (templates && templates.length) {
            templates.find($ => $.id == id).amount = parseInt(amount)
        }
    }

    res.redirect('')
}

/* -------------------------------------------------------------------------- */
module.exports.destroy = async (req, res) => {
    if (req.session.authenticated) {
        var {query: {id: productId}, session: {user: {id: userId}}} = req

        await db.item.destroy({
            where: {
                [Op.and]: [{productId}, {userId}]
            }
        })
    } else {
        var {query: {id}, session: {templates}} = req

        if (templates && templates.length) {
            req.session.templates = templates.filter($ => $.id != id)
        }
    }

    res.redirect('/store/cart')
}
