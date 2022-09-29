var db = require('../db')


/* -------------------------------------------------------------------------- */

module.exports.view = async (req, res) => {
    res.locals.categories = await db.category.findAll()
    res.locals.manufacturers = await db.manufacturer.findAll()
    res.locals.products = await db.product.findAll()

    res.render('store')
}
