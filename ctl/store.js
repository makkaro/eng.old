var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var view_data = Object.create(null)

    view_data.products = await db.product.findAll({
        attributes: Array('id', 'hidden', 'name', 'cost', 'img')
    })

    view_data.categories = await db.category.findAll({
        attributes: Array('name')
    })

    view_data.manufacturers = await db.manufacturer.findAll({
        attributes: Array('name')
    })

    res.render('store', {view_data})
}
