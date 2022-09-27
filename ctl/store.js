var db = require('../db')


/* -------------------------------------------------------------------------- */

module.exports.view = async (req, res) => {
    res.locals.categories = await db.Category.findAll()
    res.locals.manufacturers = await db.Category.findAll()
    res.locals.products = await db.Category.findAll()

    res.render('store')
}
