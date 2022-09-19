var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports.get = async function (req, res) {
    var authenticated = req.session.authenticated

    var item = await db.product.findByPk(req.params.id)

    res.locals = {authenticated, item, ...res.locals}

    res.render('product')
}
