var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var item = await db.product.findByPk(req.params.id)

    res.locals = {item, ...res.locals}

    res.render('product')
}
