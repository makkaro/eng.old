var db = require('../db')

module.exports.view = async (req, res) => {
    var inv = await db.inv.findAll()

    res.locals = {inv, ...res.locals}

    res.render('home')
}
