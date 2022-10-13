var db = require('../../../db')

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.view = async (req, res) => {
    var records = await db.category.findAll()

    res.locals = {records, ...res.locals}
    res.render('categories')
}
