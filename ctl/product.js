var {Op} = require('sequelize')

var db = require('../db')


/* -------------------------------------------------------------------------- */
module.exports.view = async (req, res) => {
    var {authenticated} = req.session

    var product = await db.Product.findByPk(req.params.id)

    res.locals = {authenticated, product, ...res.locals}

    res.render('product')
}


/* -------------------------------------------------------------------------- */
module.exports.update = async (req, res) => {
    var {body: {id}, session: {authenticated, user}} = req

    var diff = parseInt(req.body.diff)

    if (authenticated) {
        var ProductId = id, {id: UserId} = user

        var item = await db.Item.findOne({
            where: {
                [Op.and]: [{ProductId}, {UserId}]
            }
        })

        item
            ? await item.update({amount: item.amount + diff})
            : await db.Item.create({amount: diff, ProductId, UserId})
    } else {
        req.session.templates ??= Array()

        var template = req.session.templates.find($ => $.id == id)

        template
            ? template.amount += diff
            : req.session.templates.unshift({id, amount: diff})
    }
    console.log(req.session.templates)

    res.redirect(`${id}`)
}
