var db = require('../db')


/* -------------------------------------------------------------------------- */

module.exports.view = async (req, res) => {
    res.locals.categories = await db.Category.findAll()
    res.locals.manufacturers = await db.Manufacturer.findAll()
    res.locals.products = await db.Product.findAll()

    res.render('store')
}
