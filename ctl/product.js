var {Op} = require('sequelize')

var db = require('../db')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    var {authenticated} = req.session

    var product = await db.product.findByPk(req.params.id)

    res.locals = {authenticated, product, ...res.locals}

    res.render('product')
}


/* -------------------------------------------------------------------------- */
module.exports.update = async (req, res) => {
    var {body: {id}, session: {authenticated, user}} = req

    var diff = parseInt(req.body.diff)

    if (authenticated) {
        var productId = id, {id: userId} = user

        var item = await db.item.findOne({
            where: {
                [Op.and]: [{productId}, {userId}]
            }
        })

        item
            ? await item.update({amount: item.amount + diff})
            : await db.item.create({amount: diff, productId, userId})
    } else {
        req.session.templates ??= Array()

        var template = req.session.templates.find($ => $.id == id)

        template
            ? template.amount += diff
            : req.session.templates.unshift({id, amount: diff})
    }

    res.redirect('/store/cart')
}
