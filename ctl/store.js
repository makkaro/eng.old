var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var view_data = Object.create(null)

    view_data.products = await db.Product.findAll()

    view_data.categories = await db.Category.findAll()

    view_data.manufacturers = await db.Manufacturer.findAll()

    res.render('store', {view_data})
}
