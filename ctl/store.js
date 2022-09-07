var db = require('../db/models')

module.exports.index = async function (req, res) {
    var view_data = Object.create(null)

    view_data.categories = await db.category.findAll({
        attributes: ['name']
    })

    view_data.manufacturers = await db.manufacturer.findAll({
        attributes: ['name']
    })

    view_data.products = await db.product.findAll({
        attributes: ['name', 'cost', 'img', 'hidden', 'id']
    })

    view_data.url = req.originalUrl

    res.render('store', {view_data})
}
